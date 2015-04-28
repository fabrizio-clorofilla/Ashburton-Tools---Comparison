/**************************************************************************** 
Static&Dynamic Charting Widgets
App Filters
*****************************************************************************/

angular.module('SDCHART').filter('stringToMoment',
	function() {
	    return function(date, input) {
	    	if(date!='' && date!='Invalid date'){
	    		return moment(date,input)
	    	}else{
	    		return ''
	    	}
			
	    }
  	});

angular.module('SDCHART').filter('momentToString',
  function() {
      return function(date, output) {
        if(date!='' && date!='Invalid date'){
          return moment(date).format(output)
        }else{
          return ''
        }
      
      }
    });

angular.module('SDCHART').filter('firstDayMonth',
  function() {
      return function(date) {
        if(date!='' && date!='Invalid date'){
          return moment(date).startOf('month');
        }else{
          return ''
        }
      
      }
    });

angular.module('SDCHART').filter('nextMonth',
  function() {
      return function(date) {
        if(date!='' && date!='Invalid date'){
          return moment(date).add('months',1);
        }else{
          return ''
        }
      
      }
    });

angular.module('SDCHART').filter('lastDayMonth',
  function() {
      return function(date) {
        if(date!='' && date!='Invalid date'){
          return moment(date).endOf('month');
        }else{
          return ''
        }
      
      }
    });

angular.module('SDCHART').filter('momentToDate',
  function() {
      return function(date, output) {
        return moment(date).format(output)
      }
    });

angular.module('SDCHART').filter('reverse', function() {
  return function(items) {
  	if(items!=undefined){
  		return items.slice().reverse();
  	}
  };
});

angular.module('SDCHART').filter('percentage', function() {
  return function(value, decimalDigit) {
  	if(value!=""){
      return numeral(value).format('0.00')+'%';
  	}else{
  		return "N/A";
  	}
  };
});

angular.module('SDCHART').filter('capitalize', function() {
 return function(input, scope) {
 if (input!=null)
 input = input.toLowerCase();
 return input.substring(0,1).toUpperCase()+input.substring(1);
 }
});

