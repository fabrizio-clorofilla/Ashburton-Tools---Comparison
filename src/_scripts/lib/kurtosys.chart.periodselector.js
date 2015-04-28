/*

CHARTING PERIOD SELECTOR CONTROLLER
This Java script code belongs to and is managed by Kurtosys Systems Inc
Fabrizio Clorofilla

===========================================================================================

HOW TO use the controller
If only one chart is plotted on the webpage, you might use the controller straight away,
if two or more chart are plotted on the webpage creating new instances of the controller
is necessary.

e.g.: var localPeriodController = new PeriodSelectorController(Structure Object)

===========================================================================================

HOW TO configure the "Structure Object"

{
  fixed: Array of Strings,
  conditional: Array of Strings,
  order: {
    logic: Array of Strings,
    DOM:@Array of Strings 
  }
}

- fixed: are the Periods who are available to the user by default
  e.g.: ['ALL','YTD','1Y','DatePicker']
- conditional: are the Periods whose availability depends on the inception date
  of funds in the list
  e.g.: ['15Y',10Y','5Y','3Y']
- logic: defines the business logic:
  * e.g.: ['10Y','5Y','3Y']
    if the youngest inception date is before 10Y, the controller will plot 10Y
    if the youngest inception date is between 10Y and 5Y, the controller will plot 5Y
    if the youngest inception date is between 5Y and 3Y, the controller will plot 3Y
    if the youngest inception date is after 3Y, the controlle plots ALL (since inception)
- DOM: defines the output order on the DOM (if you are using angularjs it might be useful
  to generate the DOM elements through ng-repeat)

===========================================================================================

HOW TO structure the Request for getPeriodToPlot(oRequest) method

{
  user: Boolean, (mandatory)
  inceptionDates: Array of MomentJS Objects, (mandatory)
  period: String, (optional)
  from: MomentJS Date, (optional)
  to: MomentJS Date (optional)
}

- user: is true when the request is triggered by a user selection
  on the period to plot (click on periods or date picker)
- inceptionDates: is the array of inceptionDates, in MomentJS format
- period: is the period the user is asking to plot (set it to null
  or do not include it in the request at all, if not needed)
- from: is used only when the period comes from a selection via 'DatePicker'
- to: is used only when the period comes from a selection via 'DatePicker'

EXAMPLES

Default Request
{
  user: false,
  inceptionDates: [inceptionDate1,inceptionDate2,...,inceptionDateN]
}

User clicks on 5Y
{
  user: true,
  inceptionDates: [inceptionDate1,inceptionDate2,...,inceptionDateN],
  period: '5Y'
}

User uses the DatePicker to select a date range
{
  user: true,
  inceptionDates: [inceptionDate1,inceptionDate2,...,inceptionDateN],
  period: 'DatePicker',
  from: fromDateSelected,
  to: toDateSelected
}

After a selection made by the user, for future calls to the controller DO NOT set the
user flag to "TRUE" otherwise you will overwrite the previous choice. If no new choice
has been made by the user you are supposed to use the DEFAULT request. This way, in your
implementation you don't have to take care about the status you are in, just make the
"user choice" requeste with "true" in the user flag when the user selects something,
and "default" requests when you add/remove funds from the list or you redraw the chart

===========================================================================================

RESPONSE format

{
  list: Object,
  plot: {
    period: {
      label: String,
      from: MomentJS Date,
      to: MomentJS Date,
      forced: {
        toALL:
        datePickerStartFromInception:
      },
    }
  },
  status: Object,
  message: []
}

- list: is the list of periods with update availability according to the latest
  inception date (to hide/disable/add-remove-classes to your DOM element or to limit the
  DatePicker range from the latest inception date to today)
- plot: the current period to be plotted
  * label: the label of the period to plot (e.g.: '10Y', 'ALL', 'YTD', 'DatePicker', ...)
  * from: date the period starts from, in MomentJS format
  * to: date the period ends in, in MomentJS format
  * forced: is a set of boolean variables to keep track of forced conditions applied
    # datePickerStartFromInception: when the DatePicker selection in the history starts
      from a date that falls before the inception date of the funds just added
    # toALL: when for some reason the period is forced to be plotted since inception
- status: reports the status of the controller

===========================================================================================

*/

var PeriodSelectorController = function(oStructure){

  this.config = {
    periods: {
      // LIST OF ALL POTENTIALLY PLOTTABLE PERIODS
      'ALL': {
        from: null,
        to: moment().subtract('day',1),
        available: false
      },
      'YTD': {
        from: moment().startOf('year'),
        to: moment().subtract('day',1),
        available: false
      },
      'DatePicker': {
        from: null,
        to: null,
        available: false,
        minimum: null // Minimum interval selectable in Days (structure Object)
      },
      '30Y': {
        from: moment().subtract('year',30),
        to: moment().subtract('day',1),
        available: false
      },
      '20Y': {
        from: moment().subtract('year',20),
        to: moment().subtract('day',1),
        available: false
      },
      '15Y': {
        from: moment().subtract('year',15),
        to: moment().subtract('day',1),
        available: false
      },
      '10Y': {
        from: moment().subtract('year',10),
        to: moment().subtract('day',1),
        available: false
      },
      '5Y': {
        from: moment().subtract('year',5),
        to: moment().subtract('day',1),
        available: false
      },
      '3Y': {
        from: moment().subtract('year',3),
        to: moment().subtract('day',1),
        available: false
      },
      '1Y': {
        from: moment().subtract('year',1),
        to: moment().subtract('day',1),
        available: false
      },
      '9M': {
        from: moment().subtract('month',9),
        to: moment().subtract('day',1),
        available: false
      },
      '6M': {
        from: moment().subtract('month',6),
        to: moment().subtract('day',1),
        available: false
      },
      '3M': {
        from: moment().subtract('month',3),
        to: moment().subtract('day',1),
        available: false
      }
    },
    status: {
      user: {
        choice: false,
        history: {}
      }
    },
    structure: oStructure
  };

  this.getPeriodToPlot = function(oRequest){
      // DEBUG
      // console.log('PeriodController Request',oRequest);
      // This method returns the period to be plotted
      var oResponse = {};

      var aMessage = [];

      // Storing the array of inception dates in descendent order into the aDate Array
      var aDate = oRequest.inceptionDates.sort(th.sortByDateAsc);
      
      // Storing the array of inception dates in descendent order into the oDate Object,
      // together with the oldest and the youngest inception date for further uses
      var oDate = {
        list: aDate,
        oldest: aDate[0],
        youngest: aDate[aDate.length-1]
      }

      /* 
        Updating the availability of periods according to the youngest inception date
        for the set of funds. Updating only the periods included in the oStructure object
        for fixed and conditional periods. Leaving FALSE for every othe period not
        included in that particular implementation.
      */

      // Updating the fixed periods availability
      for(var i=0; i<th.config.structure.fixed.length; i++){
        if(th.config.structure.fixed[i]=='YTD'){
          if(th.config.periods[th.config.structure.fixed[i]].to.diff(th.config.periods[th.config.structure.fixed[i]].from,'month')>0){
            th.config.periods[th.config.structure.fixed[i]].available=true;
          }
        }
        else{
          th.config.periods[th.config.structure.fixed[i]].available=true;
        }
      }
      // Setting the youngest inception date as "from" date for "ALL" (since inception period)
      th.config.periods.ALL.from = oDate.youngest;

      // Updating the conditional periods availability
      for(var i=0; i<th.config.structure.conditional.length; i++){
        if(oDate.youngest <= th.config.periods[th.config.structure.conditional[i]].from) {
          th.config.periods[th.config.structure.conditional[i]].available=true;
        }
        else{
          th.config.periods[th.config.structure.conditional[i]].available=false;
        }
      }

      // Updating the DatePicker selectable range
      th.config.periods.DatePicker = th.config.periods.ALL;
      th.config.periods.DatePicker.minimum = th.config.structure.minimumPeriodPlottable;

      // Checking if the current request is a user selection or not
      if(!oRequest.user){
        // The user hasn't selected a period or DatePicker interval in the current request
        // Creating a status object for forced behaviours
        var forced = {
          toALL: false,
          datePickerStartFromInception: false
        };

        // Checking if the user has ever made a selection or not
        if(!th.config.status.user.choice){
          // The user has never made a selection
          // The controller is working in "default" mode
          var currentPeriod = null;
          // Drilling down the period to be plotted, comparing the latest inception date
          // with the business logic structure
          for(var i=0; i<th.config.structure.conditional.length; i++){
            // Creating a status variable to check if the latest inception date is in at least
            // one of the business logic structure's interval
            var isInInterval = false;
            // Comparing the latest inception date with the "i"-nth period in the business
            // logic array
            if(oDate.youngest <= th.config.periods[th.config.structure.conditional[i]].from){
              currentPeriod = th.config.structure.conditional[i];
              isInInterval = true;
              // If the youngest
              break;
            }
          }
          if(!isInInterval){
            // if the latest inception date is after any of the period in the business logic
            // structure array, the controller responds 'ALL' (since the inception)
            currentPeriod = 'ALL';
            // aMessage.push('inceptionDateBelowMinimumPeriod');
            forced.toALL = true;
          }
          if(currentPeriod!='ALL'){
            // Response for the period to plot
            oResponse.plot = {
              period: {
                label: currentPeriod,
                from: th.config.periods[currentPeriod].from,
                to: th.config.periods[currentPeriod].to,
                forced: {
                  datePickerStartFromInception: false,
                  toALL: forced.toALL
                }
              },
              message: aMessage
            }
          }
          else{
            // Response for the period to plot
            oResponse.plot = {
              period: {
                label: currentPeriod,
                from: th.config.periods[currentPeriod].from,
                to: th.config.periods[currentPeriod].to,
                forced: {
                  datePickerStartFromInception: false,
                  toALL: forced.toALL
                }
              },
              message: aMessage
            }
          }
        }
        else{
          // The user has made at least one selection in the past, but not in this request
          // The controller works in "user choice" mode
          if(th.config.status.user.history.period == 'DatePicker'){
            // The last selection made by the user is 'DatePicker'
            // Storing into a local variable the last request
            var datePickerPeriod = KS$.extend({}, th.config.status.user.history);
              // Calling DatePicker() function to get the response
            oResponse = KS$.extend({},th.DatePicker(datePickerPeriod.from,datePickerPeriod.to,oRequest.inceptionDates));
          }
          else{
            // The last selection made by the user is not 'DatePicker' (e.g.: '3Y','ALL',...)
            // Storing into a local variable the last request
            var previousPeriodPlotted = KS$.extend({}, th.config.status.user.history);
            // Creating a temp variable for the period to plot
            var tempPeriod = KS$.extend({}, th.config.periods[previousPeriodPlotted.period]);
            tempPeriod.period = previousPeriodPlotted.period;
            // Checking if the period in the history is compliant with the inception dates in the fund list
            if(th.config.periods[previousPeriodPlotted.period].from < th.config.periods.ALL.from) {
              // If it's not, plot since the inception
              tempPeriod.from = th.config.periods.ALL.from;
              tempPeriod.period = 'ALL';
              aMessage.push('msgSinceInception');
              forced.toALL = true;
            }
            
            // Response for the period to plot
            oResponse.plot = {
              period: {
                label: tempPeriod.period,
                from: tempPeriod.from,
                to: tempPeriod.to,
                forced: {
                  datePickerStartFromInception: false,
                  toALL: forced.toALL
                }
              },
              message: aMessage
            }
          }
        }
      }
      else{
        // The user has selected a period or DatePicker interval in the current request
        // The controller works in "user choice" mode

        // Creating a status object for forced behaviours
        var forced = {
          toALL: false,
          datePickerStartFromInception: false
        };

        if(oRequest.period == 'DatePicker'){
          // User selected a DatePicker interval in the current request
          // Calling DatePicker() function to get the response
          oResponse = KS$.extend({},th.DatePicker(oRequest.from,oRequest.to,oRequest.inceptionDates));
          th.config.status.user.history = oRequest;
          th.config.status.user.choice = true;
        }
        else{
          // User selected a given period in the current request
          th.config.status.user.choice = true;
          th.config.status.user.history = oRequest;
          oResponse.plot = {
            period: {
              label: oRequest.period,
              from: th.config.periods[oRequest.period].from,
              to: th.config.periods[oRequest.period].to,
              forced: {
                datePickerStartFromInception: false,
                toALL: false
              }
            },
            message: aMessage
          }
        }
      }
      // Attaching the current set of periods to the response
      oResponse.list = th.config.periods;
      // Attaching the current status object to the response
      oResponse.status = th.config.status;

      // DEBUG
      // console.log('PeriodController Response',oResponse);
      return oResponse;
    }

  this.DatePicker = function(fromDate,toDate,aDates){
    // This function is called by getPeriodToPlot when a DatePicker interval has to be plotted
    var oResponse = {};

    // Creating a status object for forced behaviours
    var forced = {
      toALL: false,
      datePickerStartFromInception: false,
      message: []
    };

    if(toDate<th.config.periods.ALL.from){
      // If the selected end of the interval falls before the latest inception date
      // force the function to plot ALL (since the inception) with an error message
      forced.datePickerStartFromInception = true;
      forced.toALL = true;
      forced.message.push('toDateBeforeInception');
    }
    else{
      if(fromDate<th.config.periods.ALL.from) {
        // If the selected start of the interval falls before the latest inception date
        // force the interval to start from the latest inception date with an error message
        fromDate = th.config.periods.ALL.from;
        forced.datePickerStartFromInception = true;
        forced.message.push('msgSinceInception');
        // forced.message.push('forcedToStartFromInception');
      }
      if(toDate.diff(fromDate,'days')<th.config.structure.minimumPeriodPlottable){
        // If the selected interval duration is less than the minimum allowed
        // force the function to recall the getPeriodToPlot with a default request
        // and attach an error message
        forced.toALL = true;
        forced.message.push('intervalTooShort');
      }
    }
    if(forced.toALL){
      // Response if the function is forced to plot ALL
      oResponse.plot = {
        period: {
          label: 'ALL',
          from: th.config.periods.ALL.from,
          to: th.config.periods.ALL.to,
          forced: {
            datePickerStartFromInception: forced.datePickerStartFromInception,
            toALL: forced.toALL
          }
        },
        message: forced.message
      }
    }else{
      // Response if the function is actually plotting a DatePicker interval
      oResponse.plot = {
        period: {
          label: 'DatePicker',
          from: fromDate,
          to: toDate,
          forced: {
            datePickerStartFromInception: forced.datePickerStartFromInception,
            toALL: false
          }
        },
        message: forced.message
      }
    }

    return oResponse;
  }

  // Function to sort Array of MomentJS Dates
  this.sortByDateAsc = function (lhs, rhs)  { return lhs > rhs ? 1 : lhs < rhs ? -1 : 0; };

  var th = this;

  return this;

};

// END of Charting Period Selector Controller


