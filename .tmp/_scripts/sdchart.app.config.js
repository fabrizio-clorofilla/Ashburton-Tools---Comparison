function SDCHART_STATIC_CONFIG() {
  this.Widget = 'SDCHART_STATIC',
  this.SITE_URL = '//ashburtontools.kurtosysweb.com';
  this.ServiceURL = '//ashburtontools.kurtosysweb.com';
  this.OptionsURL = 'http://ashburtontools.kurtosysweb.com';
  this.ClientName = 'ASHBURTONTOOLS';
  this.Company = 'ASHBURTONTOOLS';

  this.DataSource = {
    // WIDGET DATASOURCES
    fundsDetails: '43a4b941-75ac-4370-afd1-dfbbd47d1e60',
    performanceChart: 'fec3d399-16cd-47cc-8744-d3079cbabd0d',//'558a02e4-43a3-47f2-a2ff-9927070058d3',
    // performanceChart: '558a02e4-43a3-47f2-a2ff-9927070058d3',
    performanceTabs: 'b2aa1285-1e09-423e-9aef-9fe9eaf6b289',
    fundsList: 'bcdd341b-16f3-45d4-9c6d-56d24160e226',
    translations: '2bde98b3-d9bb-4a24-8de2-9cb1e2aee34c',
    // OPTIONS PAGE DATASOURCES
    optionsClientType: 'f52fe0f9-8c53-458e-8e0e-17eb363aae3e',
    optionsCountry: 'cef2e846-95d7-484f-adb7-3c1c50b9fa0a',
    optionsLanguage: '50ea2480-6ccc-470a-ad09-9ed9a68124f2',
    optionsFund: '988680f1-3ac0-4e79-9b04-9d543e636cda'
  };

  this.Params = {
    Country: "",
    Website: "",
    Language: "",
    ISIN: "",
    Benchmark: "",
    Sector: "",
    Category: "",
    PerfType: "",
    CompanyID: "285",
    RebasedValue: "100"
  };

  this.Colors = [
    '#004F5C', /* this colour is ONLY for the main Fund */
    '#98333C', /* red 80% */
    '#CC9933', /* orange 100% */
    '#5882A5', /* blue 80% */
    '#7C8857', /* green 60% */
    '#736B8E', /* orange 60% */
    '#FDD762', /* yellow 60% */
    '#42739B', /* blue 100% */
    '#A64B53', /* red 60% */
    '#52682F', /* green 100% */
    '#4B4870', /* purple 100% */
    '#FFCC33', /* yellow 100% */
    '#88232B', /* red 100% */
    '#6C92B1', /* blue 60% */
    '#60597B', /* orange 80% */
    '#697843', /* green 80% */
    '#DBB05C', /* purple 60% */
    '#FDD14E' /* yellow 80% */
  ];

  this.Tabs = [
    'ytoy', 'calyr', 'cum', 'risk'
  ];

  this.Lookup = {
    'net': 18,
    'gross': 1
  };
  this.LookupRisk = {
    'net': 51,
    'gross': 61
  };

  this.Template = {
    Main: '<div ng-include src="\'views/sdchart.static.aspx\'"></div>',
    Tabs: {
      YtoY: 'views/sdchart.static.ytoy-tab.aspx',
      CalYr: 'views/sdchart.static.calyr-tab.aspx',
      Cumul: '',
      Risk: ''
    }
  };

  this.maxItems = 5;
  var th = this;
  this.URL = {
    fundsDetails: function (vendorIDs, log) {
       var request = {
        fullURL: th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.fundsDetails + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + vendorIDs + '"/></Parameters>&_='+moment.utc().valueOf(),
        provider: '156live',
        datasource: th.DataSource.fundsDetails,
        params: {
          ISINList: vendorIDs
        }
       }
       // return th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.fundsDetails + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + vendorIDs + '"/></Parameters>&_='+moment.utc().valueOf();
      log.debug('Funds Details Request ->',request);
      return request.fullURL;
    },
    tabsData: function (ISINList, BMList, CategoryList, perfType, currency, log) {
     var request = {
      fullURL: th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceTabs + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + ISINList + '"/><Parameter Name="IdentifierType" Type="StringLong" Value="ISIN"/><Parameter Name="BMList" Type="StringLong" Value="' + BMList + '"/><Parameter Name="CategoryList" Type="StringLong" Value="' + CategoryList + '"/><Parameter Name="ReturnType" Type="StringShort" Value="' + th.Lookup[perfType] + '"/><Parameter Name="Currency" Type="StringShort" Value="' + currency + '"/><Parameter Name="RiskType" Type="StringShort" Value="' + th.LookupRisk[perfType] + '"/><Parameter Name="TimePeriod" Type="StringShort" Value="M36"/><Parameter Name="LoadDate" Type="StringShort" Value=""/><Parameter Name="intDebug" Type="StringShort" Value="1"/></Parameters>&_='+moment.utc().valueOf(),
       provider: '156live',
       datasource: th.DataSource.performanceTabs,
       params: {
         ISINList: ISINList,
         BMList: BMList,
         CategoryList: CategoryList,
         LoadDate: '',
         intDebug: '1',
         ReturnType: {
          codeFormat: th.Lookup[perfType],
          stringFormat: perfType
         }
       }
      }
      // return th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceTabs + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + ISINList + '"/><Parameter Name="BMList" Type="StringLong" Value="' + BMList + '"/><Parameter Name="CategoryList" Type="StringLong" Value="' + CategoryList + '"/><Parameter Name="ReturnType" Type="StringShort" Value="' + th.Lookup[perfType] + '"/><Parameter Name="LoadDate" Type="StringShort" Value=""/><Parameter Name="intDebug" Type="StringShort" Value="1"/></Parameters>&_='+moment.utc().valueOf();
      log.debug('Performance Tabs Request ->',request);
      return request.fullURL;
    },
    chartData: function (SecIDs, fromDate, toDate, perfType, currency, log) {
      var now = moment().format('YYYYMMDD');
      var request = {
       fullURL: th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceChart + '&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="' + SecIDs + '"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="FromDate" Type="StringShort" Value="' + fromDate + '"/><Parameter Name="ToDate" Type="StringShort" Value="' + toDate + '"/><Parameter Name="rebasedvalue" Type="StringShort" Value="' + th.Params.RebasedValue + '"/><Parameter Name="Currency" Type="StringShort" Value="' + currency + '"/><Parameter Name="UseBSOwnCurrency" Type="StringShort" Value="1"/><Parameter Name="dropincompleteBS" Type="StringShort" Value="1"/><Parameter Name="TrimToFinalDailyDate" Type="StringShort" Value="1"/><Parameter Name="ToDateDaily" Type="StringShort" Value="' + toDate + '"/><Parameter Name="ReturnType" Type="StringShort" Value="' + th.Lookup[perfType] + '"/></Parameters>&_='+moment.utc().valueOf(),
       provider: '156live',
       datasource: th.DataSource.performanceChart,
       params: {
         IdList: SecIDs,
         Universe: '',
         FromDate: fromDate,
         ToDate: toDate,
         rebasedvalue: th.Params.RebasedValue,
         UseBSOwnCurrency: '1',
         dropincompleteBS: '1',
         ReturnType: {
          codeFormat: th.Lookup[perfType],
          stringFormat: perfType
         }
       }
      }
      // return th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceChart + '&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="' + SecIDs + '"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="FromDate" Type="StringShort" Value="' + fromDate + '"/><Parameter Name="ToDate" Type="StringShort" Value="' + toDate + '"/><Parameter Name="rebasedvalue" Type="StringShort" Value="' + th.Params.RebasedValue + '"/><Parameter Name="UseBSOwnCurrency" Type="StringShort" Value="1"/><Parameter Name="dropincompleteBS" Type="StringShort" Value="1"/><Parameter Name="ReturnType" Type="StringShort" Value="' + th.Lookup[perfType] + '"/></Parameters>&_='+moment.utc().valueOf();
      log.debug('Performance Chart Request ->',request);
      return request.fullURL;
    },
    // chartData: function (SecIDs, fromDate, toDate, perfType) {
    //   var now = moment().format('YYYYMMDD');
    //   return th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceChart + '&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="' + SecIDs + '"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="FromDate" Type="StringShort" Value="' + fromDate + '"/><Parameter Name="ToDate" Type="StringShort" Value="' + toDate + '"/><Parameter Name="rebasedvalue" Type="StringShort" Value="' + th.Params.RebasedValue + '"/></Parameters>&_='+moment.utc().valueOf();
    // },
    fundsList: function(sClientTypeID,sCountryID,sLanguageID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.fundsList + '&params=<Parameters><Parameter Name="ClientTypeId" Type="StringLong" Value="' + sClientTypeID + '"/><Parameter Name="CountryId" Type="StringLong" Value="' + sCountryID + '"/><Parameter Name="LanguageId" Type="StringLong" Value="' + sLanguageID + '"/></Parameters>&_='+moment.utc().valueOf();
    },
    translations: function(sLanguageID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.translations + '&params=<Parameters><Parameter Name="LanguageId" Type="StringLong" Value="' + sLanguageID + '"/></Parameters>&_='+moment.utc().valueOf();
    },
    optionsClientType: function (){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.optionsClientType + '&params=<Parameters></Parameters>&_='+moment.utc().valueOf();
    },
    optionsCountry: function(sClientTypeID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.optionsCountry + '&params=<Parameters><Parameter Name="ClientTypeId" Type="StringLong" Value="' + sClientTypeID + '"/></Parameters>&_='+moment.utc().valueOf();
    },
    optionsLanguage: function(sClientTypeID,sCountryID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.optionsLanguage + '&params=<Parameters><Parameter Name="ClientTypeId" Type="StringLong" Value="' + sClientTypeID + '"/><Parameter Name="CountryId" Type="StringLong" Value="' + sCountryID + '"/></Parameters>&_='+moment.utc().valueOf();
    },
    optionsFund: function(sClientTypeID,sCountryID,sLanguageID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.optionsFund + '&params=<Parameters><Parameter Name="ClientTypeId" Type="StringLong" Value="' + sClientTypeID + '"/><Parameter Name="CountryId" Type="StringLong" Value="' + sCountryID + '"/><Parameter Name="LanguageId" Type="StringLong" Value="' + sLanguageID + '"/></Parameters>&_='+moment.utc().valueOf();
    }
  };

  this.PeriodController = {
    fixed: ['ALL'],
    conditional: ['5Y', '3Y'],
    order: {
      logic: ['5Y', '3Y'],
      DOM: ['5Y', '3Y', 'ALL']
    },
    minimumPeriodPlottable: 365
  };

  this.minimumInceptionDate = 365; // In days

  this.Chart = {
    chart: {
      renderTo: '',
      type: 'line',
      height: 300,
      width: 414,
      margin: [60, 0, 30, 35]
      // marginTop: 60,
      // marginBottom: 30,
      // marginRight: 0
    },
    title: {
      useHTML: true,
      text: '',
      align: 'left',
      style: {
        fontFamily: '"Interstate MG Light", Arial, Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#CCCCCC'
      },
      // margin: 0,
      x: -10,
      y: 8,
      floating: false
    },
    subtitle: {
      useHTML: true,
      text: '',
      align: 'left',
      style: {
        fontFamily: '"Interstate MG Light", Arial, Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#CCCCCC'
      },
      y: 26,
      x: -10,
      floating: false
    },
    xAxis: {
      title: '',
      type: 'datetime',
      maxZoom: 1 * 24 * 3600000, // 1 day
      pointStart: Date.UTC(2005, 0, 1),
      minPadding: 0.015,
      maxPadding: 0.015,
      showFirstLabel: true,
      showLastLabel: true,
      startOnTick: false,
      endOnTick: false,
      labels: {
        overflow: 'justify',
        y: 25,
        formatter: function () {
          return moment(this.value).format("MMM YY"); // format numbers
        }
      }
    },
    yAxis: {
      title: '',
      showFirstLabel: true,
      showLastLabel: true,
      tickmarkPlacement: 'on',
      labels: {
        // align: 'left',
        // x: -25,
        // y: 5,
        formatter: function () {
          return Highcharts.numberFormat(this.value, 0); // format numbers
        }
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#f2f2f2'
      }],
      minPadding: 0.05,
      maxPadding: 0.05
    },
    tooltip: {
      useHTML: true,
      backgroundColor: null,
      borderWidth: 0,
      shadow: false,
      crosshairs: true,
      formatter: function () {
        if(this.series.data.indexOf(this.point)==0) {
          return '<div style="background-color:' + this.series.color + '" class="mgt-1__chart--tooltip"><b>' + this.series.options.ext_name + '</b><br>' + moment(this.x).add(1,'day').format('DD-MMM-YYYY') + ', ' + numeral(this.y).format('0.00') + '</div>';
        }
        else{
          return '<div style="background-color:' + this.series.color + '" class="mgt-1__chart--tooltip"><b>' + this.series.options.ext_name + '</b><br>' + moment(this.x).format('DD-MMM-YYYY') + ', ' + numeral(this.y).format('0.00') + '</div>';
        }

      }
    },
    legend: {
      enabled: false,
      align: 'center',
      borderWidth: 0
    },
    series: [],
    credits: {
      enabled: false
    },
    plotOptions: {
      line: {
        lineWidth: 3,
        stickyTracking: false,
        marker: {
          enabled: false,
          symbol: 'circle'
        }
      },
      series: {
        events: {
          legendItemClick: function () {
            return false;
          }
        }
      }
    }
  };
}

function SDCHART_DYNAMIC_CONFIG() {
  this.Widget = 'SDCHART_DYNAMIC',
  this.SITE_URL = '//ashburtontools.kurtosysweb.com';
  this.ServiceURL = '//ashburtontools.kurtosysweb.com';
  this.OptionsURL = 'http://ashburtontools.kurtosysweb.com';
  this.ClientName = 'ASHBURTONTOOLS';
  this.Company = 'ASHBURTONTOOLS';

  this.DataSource = {
    // WIDGET DATASOURCES
    fundsDetails: '43a4b941-75ac-4370-afd1-dfbbd47d1e60',
    // performanceChart: 'fec3d399-16cd-47cc-8744-d3079cbabd0d',//'558a02e4-43a3-47f2-a2ff-9927070058d3',
    performanceChart: '558a02e4-43a3-47f2-a2ff-9927070058d3',
    // performanceChart: '558a02e4-43a3-47f2-a2ff-9927070058d3',
    performanceTabs: 'b2aa1285-1e09-423e-9aef-9fe9eaf6b289',
    fundsList: 'bcdd341b-16f3-45d4-9c6d-56d24160e226',
    translations: '2bde98b3-d9bb-4a24-8de2-9cb1e2aee34c',
    // OPTIONS PAGE DATASOURCES
    optionsClientType: 'f52fe0f9-8c53-458e-8e0e-17eb363aae3e',
    optionsCountry: 'cef2e846-95d7-484f-adb7-3c1c50b9fa0a',
    optionsLanguage: '50ea2480-6ccc-470a-ad09-9ed9a68124f2',
    optionsFund: '988680f1-3ac0-4e79-9b04-9d543e636cda'
  };

  this.Params = {
    Country: "",
    Website: "",
    Language: "",
    ISIN: "",
    Benchmark: "",
    Sector: "",
    Category: "",
    PerfType: "",
    CompanyID: "285",
    RebasedValue: "100"
  };

  this.Colors = [
    '#004F5C', /* this colour is ONLY for the main Fund */
    '#98333C', /* red 80% */
    '#CC9933', /* orange 100% */
    '#5882A5', /* blue 80% */
    '#7C8857', /* green 60% */
    '#736B8E', /* orange 60% */
    '#FDD762', /* yellow 60% */
    '#42739B', /* blue 100% */
    '#A64B53', /* red 60% */
    '#52682F', /* green 100% */
    '#4B4870', /* purple 100% */
    '#FFCC33', /* yellow 100% */
    '#88232B', /* red 100% */
    '#6C92B1', /* blue 60% */
    '#60597B', /* orange 80% */
    '#697843', /* green 80% */
    '#DBB05C', /* purple 60% */
    '#FDD14E' /* yellow 80% */
    // '#004F5C', /* this colour is ONLY for the main Fund */
    // '#88232B', /* red 100% */
    // '#CC9933', /* orange 100% */
    // '#52682F', /* green 100% */
    // '#4B4870', /* purple 100% */
    // '#FFCC33', /* yellow 100% */
    // '#42739B', /* blue 100% */
    // '#A64B53', /* red 60% */
    // '#736B8E', /* orange 60% */
    // '#7C8857', /* green 60% */
    // '#DBB05C', /* purple 60% */
    // '#FDD762', /* yellow 60% */
    // '#6C92B1', /* blue 60% */
    // '#98333C', /* red 80% */
    // '#60597B', /* orange 80% */
    // '#697843', /* green 80% */
    // '#D6A649', /* purple 80% */
    // '#FDD14E', /* yellow 80% */
    // '#5882A5' /* blue 80% */
  ];

  this.Tabs = [
    'ytoy', 'calyr', 'cum', 'risk'
  ];

  this.Cat = [
  {
    value: 'B',
    label: 'indices',
    belongTo: 'benchmark'
  }, {
    value: 'A',
    label: 'ABISector',
    belongTo: 'sector'
  }, {
    value: 'I',
    label: 'IMASector',
    belongTo: 'sector'
  },{
    value: 'S',
    label: 'morningstarCategory',
    belongTo: 'sector'
  }
  ];

  this.Lookup = {
    'net': 18,
    'gross': 1
  };
  this.LookupRisk = {
    'net': 51,
    'gross': 61
  };

  this.Template = {
    Main: '<div ng-include src="\'views/sdchart.dynamic.aspx\'"></div>',
    Tabs: {
      YtoY: 'views/sdchart.dynamic.ytoy-tab.aspx',
      CalYr: 'views/sdchart.dynamic.calyr-tab.aspx',
      Cumul: 'views/sdchart.dynamic.cum-tab.aspx',
      Risk: 'views/sdchart.dynamic.risk-tab.aspx'
    },
    DatePicker: 'views/sdchart.dynamic.datepicker.aspx'
  };

  this.maxItems = 5;

  var th = this;

  this.URL = {
 fundsDetails: function (vendorIDs, log) {
    var request = {
     fullURL: th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.fundsDetails + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + vendorIDs + '"/></Parameters>&_='+moment.utc().valueOf(),
     provider: '156live',
     datasource: th.DataSource.fundsDetails,
     params: {
       ISINList: vendorIDs
     }
    }
    // return th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.fundsDetails + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + vendorIDs + '"/></Parameters>&_='+moment.utc().valueOf();
   log.debug('Funds Details Request ->',request);
   return request.fullURL;
 },
 tabsData: function (ISINList, BMList, CategoryList, perfType, currency, log) {
  var request = {
   fullURL: th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceTabs + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + ISINList + '"/><Parameter Name="IdentifierType" Type="StringLong" Value="ISIN"/><Parameter Name="BMList" Type="StringLong" Value="' + BMList + '"/><Parameter Name="CategoryList" Type="StringLong" Value="' + CategoryList + '"/><Parameter Name="ReturnType" Type="StringShort" Value="' + th.Lookup[perfType] + '"/><Parameter Name="Currency" Type="StringShort" Value="' + currency + '"/><Parameter Name="RiskType" Type="StringShort" Value="' + th.LookupRisk[perfType] + '"/><Parameter Name="TimePeriod" Type="StringShort" Value="M36"/><Parameter Name="LoadDate" Type="StringShort" Value=""/><Parameter Name="intDebug" Type="StringShort" Value="1"/></Parameters>&_='+moment.utc().valueOf(),
    provider: '156live',
    datasource: th.DataSource.performanceTabs,
    params: {
      ISINList: ISINList,
      BMList: BMList,
      CategoryList: CategoryList,
      LoadDate: '',
      intDebug: '1',
      ReturnType: {
       codeFormat: th.Lookup[perfType],
       stringFormat: perfType
      }
    }
   }
   // return th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceTabs + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + ISINList + '"/><Parameter Name="BMList" Type="StringLong" Value="' + BMList + '"/><Parameter Name="CategoryList" Type="StringLong" Value="' + CategoryList + '"/><Parameter Name="ReturnType" Type="StringShort" Value="' + th.Lookup[perfType] + '"/><Parameter Name="LoadDate" Type="StringShort" Value=""/><Parameter Name="intDebug" Type="StringShort" Value="1"/></Parameters>&_='+moment.utc().valueOf();
   log.debug('Performance Tabs Request ->',request);
   return request.fullURL;
 },
 chartData: function (SecIDs, fromDate, toDate, perfType, currency, log) {
   var now = moment().format('YYYYMMDD');
   var request = {
    fullURL: th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceChart + '&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="' + SecIDs + '"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="FromDate" Type="StringShort" Value="' + fromDate + '"/><Parameter Name="ToDate" Type="StringShort" Value="' + toDate + '"/><Parameter Name="rebasedvalue" Type="StringShort" Value="' + th.Params.RebasedValue + '"/><Parameter Name="Currency" Type="StringShort" Value="' + currency + '"/><Parameter Name="UseBSOwnCurrency" Type="StringShort" Value="1"/><Parameter Name="dropincompleteBS" Type="StringShort" Value="1"/><Parameter Name="TrimToFinalDailyDate" Type="StringShort" Value="1"/><Parameter Name="ToDateDaily" Type="StringShort" Value="' + toDate + '"/><Parameter Name="ReturnType" Type="StringShort" Value="' + th.Lookup[perfType] + '"/></Parameters>&_='+moment.utc().valueOf(),
    provider: '156live',
    datasource: th.DataSource.performanceChart,
    params: {
      IdList: SecIDs,
      Universe: '',
      FromDate: fromDate,
      ToDate: toDate,
      rebasedvalue: th.Params.RebasedValue,
      UseBSOwnCurrency: '1',
      dropincompleteBS: '1',
      ReturnType: {
       codeFormat: th.Lookup[perfType],
       stringFormat: perfType
      }
    }
   }
   // return th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceChart + '&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="' + SecIDs + '"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="FromDate" Type="StringShort" Value="' + fromDate + '"/><Parameter Name="ToDate" Type="StringShort" Value="' + toDate + '"/><Parameter Name="rebasedvalue" Type="StringShort" Value="' + th.Params.RebasedValue + '"/><Parameter Name="UseBSOwnCurrency" Type="StringShort" Value="1"/><Parameter Name="dropincompleteBS" Type="StringShort" Value="1"/><Parameter Name="ReturnType" Type="StringShort" Value="' + th.Lookup[perfType] + '"/></Parameters>&_='+moment.utc().valueOf();
   log.debug('Performance Chart Request ->',request);
   return request.fullURL;
 },
    // chartData: function (SecIDs, fromDate, toDate, perfType) {
    //   var now = moment().format('YYYYMMDD');
    //   return th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.performanceChart + '&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="' + SecIDs + '"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="FromDate" Type="StringShort" Value="' + fromDate + '"/><Parameter Name="ToDate" Type="StringShort" Value="' + toDate + '"/><Parameter Name="rebasedvalue" Type="StringShort" Value="' + th.Params.RebasedValue + '"/></Parameters>&_='+moment.utc().valueOf();
    // },
    fundsList: function(sClientTypeID,sCountryID,sLanguageID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.fundsList + '&params=<Parameters><Parameter Name="ClientTypeId" Type="StringLong" Value="' + sClientTypeID + '"/><Parameter Name="CountryId" Type="StringLong" Value="' + sCountryID + '"/><Parameter Name="LanguageId" Type="StringLong" Value="' + sLanguageID + '"/></Parameters>&_='+moment.utc().valueOf();
    },
    translations: function(sLanguageID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.translations + '&params=<Parameters><Parameter Name="LanguageId" Type="StringLong" Value="' + sLanguageID + '"/></Parameters>&_='+moment.utc().valueOf();
    },
    optionsClientType: function (){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.optionsClientType + '&params=<Parameters></Parameters>&_='+moment.utc().valueOf();
    },
    optionsCountry: function(sClientTypeID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.optionsCountry + '&params=<Parameters><Parameter Name="ClientTypeId" Type="StringLong" Value="' + sClientTypeID + '"/></Parameters>&_='+moment.utc().valueOf();
    },
    optionsLanguage: function(sClientTypeID,sCountryID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.optionsLanguage + '&params=<Parameters><Parameter Name="ClientTypeId" Type="StringLong" Value="' + sClientTypeID + '"/><Parameter Name="CountryId" Type="StringLong" Value="' + sCountryID + '"/></Parameters>&_='+moment.utc().valueOf();
    },
    optionsFund: function(sClientTypeID,sCountryID,sLanguageID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.optionsFund + '&params=<Parameters><Parameter Name="ClientTypeId" Type="StringLong" Value="' + sClientTypeID + '"/><Parameter Name="CountryId" Type="StringLong" Value="' + sCountryID + '"/><Parameter Name="LanguageId" Type="StringLong" Value="' + sLanguageID + '"/></Parameters>&_='+moment.utc().valueOf();
    }
  };

  this.PeriodController = {
    fixed: ['ALL', 'YTD', '1Y', 'DatePicker'],
    conditional: ['10Y', '5Y', '3Y'],
    order: {
      logic: ['10Y', '5Y', '3Y'], // First element of this array is the DEFAULT value to be displayed
      DOM: ['DatePicker', 'YTD', '1Y', '3Y', '5Y', '10Y', 'ALL']
    },
    minimumPeriodPlottable: 90
  };

  this.minimumInceptionDate = 365; // In days

  this.chartDataFrequency = 'monthly'; // options: monthly/weekly/daily

  this.Chart = {
    chart: {
      renderTo: '',
      type: 'line',
      width: 910,
      height: 400,
      margin: [0, 0, 0, 0]
    },
    colors: [],
    title: {
      useHTML: true,
      text: '',
      margin: 0
    },
    subtitle: {
      useHTML: true,
      text: '',
      margin: 0
    },
    labels: {
      items: {
        style: {
          left: '100px'
        }
      }
    },
    xAxis: {
      title: '',
      type: 'datetime',
      maxZoom: 1 * 24 * 3600000, // 1 day
      pointStart: Date.UTC(2005, 0, 1),
      showFirstLabel: false,
      showLastLabel: true,
      minPadding: 0.5,
      maxPadding: 0,
      //offset: -30,
      startOnTick: true,
      endOnTick: true,
      tickPositions: [],
      labels: {
        useHTML: true,
        overflow: 'justify',
        y: -8,
        formatter: function () {
          return moment(this.value).format("MMM YY"); // format numbers
        },
        style: {
          color: '#cccccc',
          whiteSpace: 'nowrap',
          paddingRight: '10px'
          // display: 'block',
          // border: '1px solid #fff'
        }
      },
      tickColor: '#ffffff',
      gridLineWidth: 1, // New value
      plotLines: [{
        value: 0,
        width: 1,
        color: '#f2f2f2'
      }]
    },
    yAxis: {
      title: '',
      //overflow: 'justify',
      showFirstLabel: true,
      showLastLabel: false,
      labels: {
        align: 'left',
        x: 8,
        y: -7,
        formatter: function () {
          return Highcharts.numberFormat(this.value, 0); // format numbers
        },
        style: {
          color: '#cccccc'
        }
      },
      //offset: -40,
      tickColor: '#ffffff',
      plotLines: [{
        value: 0,
        width: 1,
        color: '#f2f2f2'
      }],
      minPadding: 0,
      maxPadding: 0,
      min: 0,
      max: 0
    },
    tooltip: {
      useHTML: true,
      backgroundColor: null,
      borderWidth: 0,
      shadow: false,
      formatter: function () {
        if(this.series.data.indexOf(this.point)==0) {
          return '<div style="background-color:' + this.series.color + '" class="mgt-1__chart--tooltip"><b>' + this.series.options.ext_name + '</b><br>' + moment(this.x).add(1,'day').format('DD-MMM-YYYY') + ', ' + numeral(this.y).format('0.00') + '</div>';
        }
        else{
          return '<div style="background-color:' + this.series.color + '" class="mgt-1__chart--tooltip"><b>' + this.series.options.ext_name + '</b><br>' + moment(this.x).format('DD-MMM-YYYY') + ', ' + numeral(this.y).format('0.00') + '</div>';
        }
      }
    },
    legend: {
      enabled: false
    },
    series: [],
    credits: {
      enabled: false
    },
    plotOptions: {
      line: {
        lineWidth: 3,
        shadow: true,
        marker: {
          enabled: false,
          symbol: 'circle'
        }
      },
      area: {
        marker: {
          enabled: false
        },
        fillOpacity: 1
        /*,
          fillColor: {
              // include this in page: <script src="https://rawgithub.com/highslide-software/pattern-fill/master/pattern-fill.js"></script>
              pattern: '__DEPLOYMENTURL__/_images/mandg_dark_blue_tile.gif',
              width: 5,
              height: 5
          }
        */
      }
    }
  };
};

function SDCHART_ENTRYCHARGE_CONFIG() {
  this.Widget = 'SDCHART_ENTRYCHARGE';
  this.SITE_URL = '//ashburtontools.kurtosysweb.com';
  this.ServiceURL = '//ashburtontools.kurtosysweb.com';
  this.OptionsURL = 'http://ashburtontools.kurtosysweb.com';
  this.ClientName = 'ASHBURTONTOOLS';
  this.Company = 'ASHBURTONTOOLS';

  this.DataSource = {
    // WIDGET DATASOURCES
    entryChargeChart: '95274cf2-c81a-45d7-904c-b8e05571fe46',
    translations: '2bde98b3-d9bb-4a24-8de2-9cb1e2aee34c'
  };

  this.Params = {
    Country: "",
    Website: "",
    Language: "",
    ISIN: "",
    Benchmark: "",
    Sector: "",
    Category: "",
    PerfType: "",
    CompanyID: "285",
    RebasedValue: "100"
  };

  this.Colors = [
    '#004F5C', /* this colour is ONLY for the main Fund */
    '#98333C', /* red 80% */
    '#CC9933', /* orange 100% */
    '#5882A5', /* blue 80% */
    '#7C8857', /* green 60% */
    '#736B8E', /* orange 60% */
    '#FDD762', /* yellow 60% */
    '#42739B', /* blue 100% */
    '#A64B53', /* red 60% */
    '#52682F', /* green 100% */
    '#4B4870', /* purple 100% */
    '#FFCC33', /* yellow 100% */
    '#88232B', /* red 100% */
    '#6C92B1', /* blue 60% */
    '#60597B', /* orange 80% */
    '#697843', /* green 80% */
    '#DBB05C', /* purple 60% */
    '#FDD14E' /* yellow 80% */
  ];

  this.Tabs = [
    'ytoy', 'calyr', 'cum', 'risk'
  ];

  this.Lookup = {
    'net': 18,
    'gross': 1
  };
  this.LookupRisk = {
    'net': 51,
    'gross': 61
  };

  this.Template = {
    Main: '<div ng-include src="\'views/sdchart.entrycharge.aspx\'"></div>'
  };

  this.maxItems = 5;
  var th = this;
  this.URL = {
    fundEntryChargeData: function (vendorIDs, log) {
       var request = {
        fullURL: th.ServiceURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.entryChargeChart + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + vendorIDs + '"/></Parameters>&_='+moment.utc().valueOf(),
        provider: '156live',
        datasource: th.DataSource.fundsDetails,
        params: {
          ISINList: vendorIDs
        }
       }
       // return th.ServiceURL + '/KAPI/Wrapper.aspx?provider=156live&datasource=' + th.DataSource.fundsDetails + '&params=<Parameters><Parameter Name="ISINList" Type="StringLong" Value="' + vendorIDs + '"/></Parameters>&_='+moment.utc().valueOf();
      log.debug('Funds Details Request ->',request);
      return request.fullURL;
    },
    translations: function(sLanguageID){
      return th.OptionsURL + '/KAPI/Wrapper.aspx?provider='+th.ClientName+'&datasource=' + th.DataSource.translations + '&params=<Parameters><Parameter Name="LanguageId" Type="StringLong" Value="' + sLanguageID + '"/></Parameters>&_='+moment.utc().valueOf();
    }
  };

  this.PeriodController = {
    fixed: ['ALL'],
    conditional: ['5Y', '3Y'],
    order: {
      logic: ['5Y', '3Y'],
      DOM: ['5Y', '3Y', 'ALL']
    },
    minimumPeriodPlottable: 365
  };

  this.minimumInceptionDate = 365; // In days

  this.JSON = {
    Tables: [{
        Name: "Table1",
        Rows: [{
          FundName: "M&G Test Fund",
          AsOf: "30/06/2013 00:00:00",
          Years: 5
        }]
      },
      {
        Name: "Table2",
        Rows: [{
          PeriodStart: "01/07/2009 00:00:00",
          PeriodEnd: "30/06/2010 00:00:00",
          ValueGross: Math.random()*(28-22)+22,
          ValueNet: Math.random()*(28-22)+22
        },
        {
          PeriodStart: "01/07/2010 00:00:00",
          PeriodEnd: "30/06/2011 00:00:00",
          ValueGross: Math.random()*(28-22)+22,
          ValueNet: Math.random()*(28-22)+22
        },
        {
          PeriodStart: "01/07/2011 00:00:00",
          PeriodEnd: "30/06/2012 00:00:00",
          ValueGross: Math.random()*(28-22)+22,
          ValueNet: Math.random()*(28-22)+22
        },{
          PeriodStart: "01/07/2012 00:00:00",
          PeriodEnd: "30/06/2013 00:00:00",
          ValueGross: Math.random()*(28-22)+22,
          ValueNet: Math.random()*(28-22)+22
        },
        {
          PeriodStart: "01/07/2013 00:00:00",
          PeriodEnd: "30/06/2014 00:00:00",
          ValueGross: Math.random()*(28-22)+22,
          ValueNet: Math.random()*(28-22)+22
        }]
      }]
  };

  this.Chart = {
      chart: {
          renderTo: '',
          type: 'column',
          height: 350,
          margin: [50, 0, 65, 0],
          width: 872
      },
      colors: [
          '#004F5C', /* this colour is ONLY for the main Fund */
          '#9ea900',
          '#52682F', /* green 100% */
          '#88232B', /* red 100% */
          '#CC9933', /* purple 100% */
          '#4B4870', /* orange 100% */
          '#FFCC33', /* yellow 100% */
          '#42739B', /* blue 100% */
          '#7C8857', /* green 60% */
          '#A64B53', /* red 60% */
          '#736B8E', /* purple 60% */
          '#DBB05C', /* orange 60% */
          '#FDD762', /* yellow 60% */
          '#6C92B1', /* blue 60% */
          '#697843', /* green 80% */
          '#98333C', /* red 80% */
          '#60597B', /* purple 80% */
          '#D6A649', /* orange 80% */
          '#FDD14E', /* yellow 80% */
          '#5882A5' /* blue 80% */
      ],
      title: {
          useHTML: true,
          text: '',
          align: 'left',
          style: {
              fontFamily: 'Interstate MG Light',
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#CCCCCC'
          },
          margin: 35,
          x: -10,
          floating: false
      },
      subtitle: {
          useHTML: true,
          text: '',
          align: 'left',
          style: {
              fontFamily: 'Interstate MG Light',
              fontWeight: 'bold',
              fontSize: '12px',
              color: '#CCCCCC'
          }
      },
      xAxis: {
          useHTML: true,
          categories: [],
          minPadding: 0.015,
          maxPadding: 0.015,
          showFirstLabel: true,
          showLastLabel: true,
          startOnTick: false,
          endOnTick: false,
          labels: {
              overflow: 'justify',
              y: 25
          },
      },
      yAxis: {
          title: '',
          showFirstLabel: false,
          showLastLabel: true,
          labels: {
              x: 25,
              y: 15,
              formatter: function() {
                  return Highcharts.numberFormat(this.value, 0); // format numbers
              }
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#f2f2f2'
          }],
          minPadding: 0.05,
          maxPadding: 0.05
      },
      tooltip: {
          // headerFormat: '<span style="font-size:10px">{point.key}</span><hr><table>',
          headerFormat: '<table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      legend: {
          align: 'center',
          borderWidth: 0,
          y: 15
      },
      series: [],
      credits: {
          enabled: false
      },
      plotOptions: {
          column: {
              pointPadding: 0,
              borderWidth: 0
          }
      }
  };
}

