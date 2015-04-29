/**************************************************************************** 
Static&Dynamic Charting Widgets
App Data Services
*****************************************************************************/

angular.module('SDCHART').service('DataService', ['$http', '$rootScope', '$q', '$filter', '$log', 'ErrorHandler', 'MessageHandler', function($http, $rootScope, $q, $filter, $log, ErrorHandler, MessageHandler){

	this.fromDate = null;
	this.reqYears = null;
	this.vendorsIDs = null;
	this.chart = null;
	this.plottables = [];
	this.colors = [];
	this.serieses = [];
	this.hash = null;
	this.message = [];

	// STATUS variables
	this.status = {
		init: false,
		valid: false,
		toggle: false,
		chart: null,
		fundAdded: true
	};

	// TO DO
	this.loader = {
		init: {
			chart: true,
			tabs: true,
			fundlist: true
		},
		reload: {
			chart: false,
			tabs: false,
			fundlist: false
		}
	};

	this.toggleHash = null;

	// Object to handle inception dates and chart request dates
	this.date = {
		from: null,
		to: moment(),
		reqYr: null,
		init: true,
		// inceptionDate is the youngest among all the funds added to the list
		available: null
	};

	// Array to store tabs to be displayed
	this.tabs = [];
	// Array to store dropdown elements to be displayed
	this.elements = [];

	var th = this;

	this.isDynamic = function(){
		if($rootScope.config.Widget == 'SDCHART_DYNAMIC') {
			return true;	
		}
		else{
			return false;
		}
	}

	// DONE
	this.colorConfig = function(){
		for(var i=0; i<$rootScope.config.Colors.length; i++){
			var tObj = {};
			tObj.color = $rootScope.config.Colors[i];
			tObj.identifier = null;
			tObj.used = false;
			th.colors.push(tObj);
		};
	}

	// DONE
	this.tabsConfig = function(){
		var elmToDelete = [];
		for(var i=0; i<$rootScope.config.Tabs.length; i++){
			var doHide = false;
			for (var j=0; j<$rootScope.config.Params.HiddenTab.length; j++) {
				if($rootScope.config.Tabs[i]==$rootScope.config.Params.HiddenTab[j]){
					doHide = true;
					break;
				}
			};
			if(!doHide) th.tabs.push($rootScope.config.Tabs[i]);
		};
	}

	// TO CREATE A TIMESTAMP HASH
	// th.hash = moment.utc().valueOf();

	// DONE
	this.pushPlottable = function(aElements, sType){
		if(aElements.length>0){
			for(var i=0; i<aElements.length; i++){
				var tObj = {};
				tObj.identifier = aElements[i];
				tObj.SecId = '';
				tObj.name = '';				
				(sType=='fund') ? tObj.SecId = '' : tObj.SecId = aElements[i];
				tObj.index = th.plottables.length; // adds as index the lenght of "plottables"
				tObj.visible = true;
				tObj.active = true;
				tObj.color = th.getColor(tObj.identifier);
				tObj.color03Opacity = new Highcharts.Color(tObj.color).setOpacity(0.30).get()
				tObj.type = sType;

				th.plottables.push(tObj);
			};	
		}
	}

	this.pushEmptyPlottable = function(currency){

		var tObj = {};
		tObj.identifier = '';
		tObj.SecId = '';
		tObj.name = '';
		tObj.identifier = '';
		tObj.index = 0;
		tObj.currency = currency;
		tObj.visible = false;
		tObj.active = false;
		tObj.color = '';
		tObj.color03Opacity = '';
		tObj.type = '';

		th.plottables.push(tObj);
	}

	this.resetWidget = function(){
		th.plottables = [];
		for(var i=0; i<th.colors.length; i++){
			th.colors[i].identifier = null;
			th.colors[i].used = false;
		}
		th.loader.init.chart =  true;
		th.loader.init.tabs = true;
		th.loader.reload.chart = true;
		th.loader.reload.tabs = true;
	}

	this.checkPlottable = function(oElement){
		var activePlottablesCount = 0;
		var activeFundsCount = 0;
		var oResponse = {
			status: false,
			last: false,
			error: ''
		};
		for(var i=0; i<th.plottables.length; i++){
			if(th.plottables[i].active == true) activePlottablesCount++;
			if(th.plottables[i].active == true && th.plottables[i].type == 'fund') activeFundsCount++;
		}
		if(activePlottablesCount == 1 && activeFundsCount == 1) return { status: true,	last: true,	error: ''}
		if(activePlottablesCount > 1) {
			if(activeFundsCount == 1) {
				if(oElement.Type == 'fund'){
					return { status: false,	last: true,	error: 'lastFundMsg'}
				}
				else {
					return { status: true,	last: false,	error: ''}
				}
			}
			else{
				return { status: true,	last: false,	error: ''}
			}
		}
	}

	// DONE
	this.pushPlottableDynamic = function(oElement){
		if(!th.status.fundAdded) th.pushEmptyPlottable(oElement.CurrencyCode);
		var isDuplicate = false;
		var isLimit = false;
		var itemCounter = 0;
		for(var i=0; i<th.plottables.length; i++){
			if(th.plottables[i].active) itemCounter++;
			if(itemCounter>=$rootScope.config.maxItems){
				isLimit = true;
				MessageHandler.pushMessage($filter('translate')('msgMaxItems',$rootScope.config.Params.Language),true);
				break;
			}
			if(th.plottables[i].identifier==oElement.Identifier && th.plottables[i].active==true){
				isDuplicate = true;
				MessageHandler.pushMessage($filter('translate')('msgItemSelected',$rootScope.config.Params.Language),true);
				break;
			}
		}
		if(!isDuplicate && !isLimit){
			var tObj = {};
			tObj.identifier = oElement.Identifier;
			tObj.SecId = oElement.SecId;
			tObj.name = oElement.Name;
			tObj.identifier = oElement.Identifier;
			tObj.index = th.plottables.length;
			tObj.currency = oElement.CurrencyCode;
			tObj.visible = true;
			tObj.active = true;
			tObj.color = th.getColor(tObj.identifier);
			tObj.color03Opacity = new Highcharts.Color(tObj.color).setOpacity(0.30).get();

			var sType = '';
			switch(oElement.Type){
				case "F": sType = 'fund'; break;
				case "C": sType = 'sector'; break;
				case "S": sType = 'sector'; break;
				case "I": sType = 'sector'; break;
				case "A": sType = 'sector'; break;
				case "B": sType = 'benchmark'; break;
			}
			tObj.type = sType;
			// if(sType=='fund') tObj.inceptionDate = moment(oElement.MinPerfDate,'MM/DD/YYYY').format('YYYY-MM-DD');
			if(sType=='fund') tObj.inceptionDate = moment(oElement.InceptionDate,'MM/DD/YYYY').format('YYYY-MM-DD');

			th.plottables.push(tObj);
		}

		return !isDuplicate && !isLimit;
	}

	// DONE
	this.buildFundListRequest = function(){
		var sFundsList = '';
		for (var i = 0; i < th.plottables.length; i++) {
			if(th.plottables[i].type=='fund' && th.plottables[i].active == true){
				sFundsList+= th.plottables[i].identifier+",";
			}
		};
		if(sFundsList!=''){
			return {request: {list: sFundsList.replace(/,$/, '')}};
		}
		else{
			return false;
		}
	}

	// DONE
	this.API_getFundsDetails = function(oRequestList) {

		//var URL = $rootScope.config.URL.fundsDetails(oRequestList.request.list) + "&cb=$rootScope.jsonpCallback";
		var URL = $rootScope.config.URL.fundsDetails(oRequestList.request.list, $log);
		var d = $q.defer();	
		window.KS.needXDomain($rootScope.config.SITE_URL)&&window.KS.isIE()&&window.KS.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;		

			window.FundDetailsJsonpCallbackFunction = function(response){
				if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){
					ErrorHandler.setError('Fund Details API Error - '+response+'. Requested URL: '+config.url);
					console.log('Fund Details API Error - '+response+'. Requested URL: '+config.url);
					d.reject(response);
				}
				else{
					d.resolve(response);
				}
			}

			$http.jsonp(URL+'&callback=FundDetailsJsonpCallbackFunction',null,{cache: false})
				.success(function(response){

				});
				// .error(function(response, status, headers, config){
				// 	ErrorHandler.setError('Chart API Error - Server Replied with a '+status+' status. Requested URL: '+config.url);
				// });

		return d.promise
	}

	// DONE
	this.parseFundsDetails = function(res){
		var aFunds = res.Tables[0].Rows;
		var oFunds = {};

		for (var i = 0; i < aFunds.length; i++) {
			oFunds[aFunds[i].ISIN] = {};
			oFunds[aFunds[i].ISIN].ISIN = aFunds[i].ISIN;
			oFunds[aFunds[i].ISIN].SecId = aFunds[i].FundVendorId;
			// oFunds[aFunds[i].ISIN].inceptionDate = aFunds[i].MinPerfDate;
			oFunds[aFunds[i].ISIN].inceptionDate = aFunds[i].InceptionDate;
			oFunds[aFunds[i].ISIN].name = aFunds[i].FundName;
			oFunds[aFunds[i].ISIN].currency = aFunds[i].CurrencyCode;
		};

		return oFunds;
	}

	// DONE
	this.updatePlottables = function(oFundsDetails) {
		for (var i = 0; i < th.plottables.length; i++) {
			if(th.plottables[i].type == 'fund' && th.plottables[i].identifier == oFundsDetails.ISIN){
				th.plottables[i].SecId = oFundsDetails.SecId;
				th.plottables[i].inceptionDate = oFundsDetails.inceptionDate;
				th.plottables[i].name = oFundsDetails.name;
				th.plottables[i].currency = oFundsDetails.currency;
			}
		};
	}

	this.getInceptionDates = function(){
		// This function returns an object containing the Array of inception dates, in MomentJS format
		// together with the younges and oldest inception date
		var aInceptionDates = [];
		
		// Function to sort Array of MomentJS Dates
		var sortByDateAsc = function (lhs, rhs)  { return lhs > rhs ? 1 : lhs < rhs ? -1 : 0; };

		for (var i = 0; i < th.plottables.length; i++) {
			if(th.plottables[i].type == 'fund' && th.plottables[i].active == true){
				if(th.plottables[i].inceptionDate != ''){
					aInceptionDates.push(moment(th.plottables[i].inceptionDate,"YYYY-MM-DD"));
				}
			}
		};

		if(aInceptionDates.length>0){
			var aDate = aInceptionDates.sort(sortByDateAsc);

			return {
			  list: aDate,
			  oldest: aDate[0],
			  youngest: aDate[aDate.length-1]
			}
		}
		else{
			return false;
		}

	}

	// DONE
	this.isValid = function() {

		var oInceptionDate = th.getInceptionDates();
		if(oInceptionDate){
			if(!oInceptionDate.youngest.diff(moment(),'days')<$rootScope.config.minimumInceptionDate){
			  return true;
			}
			else{
				ErrorHandler.setError('lessThan1Yr');
				return false;
			}
		}
		else{
			return false;
		}
		return false;
	}

	// DONE
	this.getColor = function(sIdentifier){
		if(sIdentifier){
			var Color = function(){
				this.value = null;
				this.id = null;
			}
			var colorReassigned = new Color();
			var colorBack = new Color();
			var colorFree = new Color();
			var colorReturn = null;

			for (var i = 0; i < th.colors.length; i++) {
				if(th.colors[i].used==false){
					if(th.colors[i].identifier==null){
						if(colorFree.value == null){
							colorFree.value = th.colors[i].color;
							colorFree.id = i;
						}
					}
					else{
						if(th.colors[i].identifier==sIdentifier){
							colorBack.value = th.colors[i].color;
							colorBack.id = i;
							break;
						}else{
							if(colorReassigned.value == null){
								colorReassigned.value = th.colors[i].color;
								colorReassigned.id = i;
							}
						}
					}
				}
			};

			var colorPriority = [colorBack,colorFree,colorReassigned];
			for (var i = 0; i < colorPriority.length; i++) {
				if(colorPriority[i].value!=null){
					th.colors[colorPriority[i].id].identifier = sIdentifier;
					th.colors[colorPriority[i].id].used = true;
					colorToAssign = th.colors[colorPriority[i].id].color;
					break;
				}
			};

			return colorToAssign;
		}
	}

	// DONE
	this.releaseColor = function(sIdentifier){
		for(var i=0; i<th.colors.length; i++){
			if(th.colors[i].identifier == sIdentifier) th.colors[i].used = false;
		}
	}

	// DONE
	this.buildLineChartRequest = function(oPeriod){
		var sRequestList = '';
		for (var i = 0; i < th.plottables.length; i++) {
			if(th.plottables[i].active == true){
				sRequestList+= th.plottables[i].SecId+",";
			}
		};
		if(sRequestList!=''){
			return {request:
						{
							list: sRequestList.replace(/,$/, '')
							,from: moment(oPeriod.plot.period.from).format('YYYYMMDD')
							,to: moment(moment(oPeriod.plot.period.to)).format('YYYYMMDD')
						}
					}
		}
		else{
			return false;
		}
	}

	// DONE
	this.buildPerfTabsRequest = function(){
		var ISINList = '';
		var BMList = '';
		var CategoryList = '';

		for (var i = 0; i < th.plottables.length; i++) {
			if(th.plottables[i].active == true){
				switch(th.plottables[i].type){
					case 'fund': ISINList+=th.plottables[i].identifier+","; break;
					case 'benchmark': BMList+=th.plottables[i].identifier+","; break;
					case 'sector': CategoryList+=th.plottables[i].identifier+","; break;
					case 'category': CategoryList+=th.plottables[i].identifier+","; break;
				}
			}
		};
		if(ISINList!='' || BMList!='' || CategoryList!=''){
			return {request:
						{
							ISINList: ISINList.replace(/,$/, '')
							,BMList: BMList.replace(/,$/, '')
							,CategoryList: CategoryList.replace(/,$/, '')
							,PerfType: $rootScope.config.Params.PerfType
						}
					}
		}
		else{
			return false;
		}
	}

	// DONE
	this.getPlottables = function(){
		return th.plottables;
	}

	this.isUpdated = function(){
		return th.hash;
	}

	// TO CHECK
	this.isFund = function(SecId){
		for(var i=0; i<th.plottables.length; i++){
			if(th.plottables[i].SecId==SecId && th.plottables[i].type == 'fund') return true;
		}
		return false;
	}

	this.toggleSeries = function(index){
		for(var i=0; i<th.plottables.length; i++){
			if(th.plottables[i].index==index){
				th.plottables[i].visible = !th.plottables[i].visible;
				th.toggleHash = moment.utc().valueOf();
				return th.plottables[i].visible;
				break;
			}
		}
	}

	this.deleteSeries = function(index,identifier){
		th.plottables[index].active=false;
		th.releaseColor(identifier);

		th.status.valid = moment.utc().valueOf()
	}

	this.toggleUpdate = function(){
		return th.toggleHash;
	}

	this.storeChart = function(chartObj){
		th.chart = chartObj;
	}

	this.getChart = function(){
		return th.chart;
	}

	this.getReqDate = function(){
		return th.date;
	}

	this.setLoading = function(item,type,flag){
		th.loader[type][item] = flag;
	}

	this.isLoading = function(type){
		if(type){
			return (th.loader[type].chart || th.loader[type].tabs || th.loader[type].fundlist);	
		}
		else{
			if(th.isDynamic()) {
				return (th.loader.init.chart || th.loader.init.tabs || th.loader.reload.chart || th.loader.reload.tabs || th.loader.init.fundlist);
			}
			else{
				return (th.loader.init.chart || th.loader.init.tabs || th.loader.reload.chart || th.loader.reload.tabs);
			}
		}
	}

	this.entryChargeLoading = function(){
			return th.loader.init.chart;
	}

	this.getWebsite = function(){
		return $rootScope.config.SITE_URL;
	}

	// DONE
	this.API_getEntryChargeData = function(oRequestList) {

		//var URL = $rootScope.config.URL.fundsDetails(oRequestList.request.list) + "&cb=$rootScope.jsonpCallback";
		var URL = $rootScope.config.URL.fundEntryChargeData(oRequestList.request.fund, $log);
		var d = $q.defer();	
		window.KS.needXDomain($rootScope.config.SITE_URL)&&window.KS.isIE()&&window.KS.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;		

			window.EntryChargeJsonpCallbackFunction = function(response){
				if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){
					ErrorHandler.setError('Fund Details API Error - '+response+'. Requested URL: '+config.url);
					console.log('Fund Details API Error - '+response+'. Requested URL: '+config.url);
					d.reject(response);
				}
				else{
					// d.resolve(response);
					setTimeout(function(){d.resolve(response);},150)
				}
			}

			$http.jsonp(URL+'&callback=EntryChargeJsonpCallbackFunction',null,{cache: false})
				.success(function(response){
					console.log("JSONP call is executed: "+new Date().getTime());
				});
				// .error(function(response, status, headers, config){
				// 	ErrorHandler.setError('Chart API Error - Server Replied with a '+status+' status. Requested URL: '+config.url);
				// });

		return d.promise
	}

	// DONE
	this.parseEntryChargeData = function(oRes) {
			var oDetails = oRes.Tables[0].Rows[0];
			var aChartData = oRes.Tables[1].Rows;
			var aCategories = [];
			var aSerieses = [{
				name: $filter('translate')('fundGross',$rootScope.config.Params.Language), 
				zIndex: 3, 
				data: []
			},{
				name: $filter('translate')('fundNet',$rootScope.config.Params.Language), 
				zIndex: 2, 
				data: []
			}];
			
			for(var i=0; i<aChartData.length; i++){
				aSerieses[0].data.push(parseFloat(aChartData[i].ValueGross));
				aSerieses[1].data.push(parseFloat(aChartData[i].ValueNet));

				var fromDate = moment(aChartData[i].PeriodStart,'DD/MM/YYYY');
				var toDate = moment(aChartData[i].PeriodEnd,'DD/MM/YYYY');
				aCategories.push(moment(fromDate).format('DD.MM.YYYY')+"<br>"+moment(toDate).format('DD.MM.YYYY'));
			}
			
			return {details: oDetails, categories: aCategories, serieses: aSerieses};
	}

}]);

angular.module('SDCHART').service('ChartDataService', ['$http', '$rootScope', '$q', '$filter', '$log', 'ErrorHandler', 'DataService', function($http, $rootScope, $q, $filter, $log, ErrorHandler, DataService){

	var injector = angular.injector(['pascalprecht.translate']);
	translate = injector.get('$translate');

	this.PeriodRequest = {};

	this.getPeriodRequest = function(){
		return th.PeriodRequest;
	}

	this.setPeriodRequest = function(defaultFlag, sPeriod, mFromDate, mToDate){
		if(defaultFlag){
			// If the request is 'default'
			th.PeriodRequest = {
													 user: false,
													 inceptionDates: DataService.getInceptionDates().list
												 }
		}
		else{
			// If the request is made by the 'user'
			th.PeriodRequest = {
													 user: true,
													 inceptionDates: DataService.getInceptionDates().list,
													 period: sPeriod || 'ALL',
													 from: mFromDate || null,
													 to: mToDate || null
												 }
		}
	}

	this.API_getChartData = function(oRequest,perfType) {

		var URL = $rootScope.config.URL.chartData(oRequest.request.list,oRequest.request.from,oRequest.request.to, perfType, DataService.plottables[0].currency, $log);
		var d = $q.defer();		
		window.KS.needXDomain($rootScope.config.SITE_URL)&&window.KS.isIE()&&window.KS.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;

		window.ChartJsonpCallbackFunction = function(response){
			if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){
				ErrorHandler.setError('Chart API Error - '+response+'. Requested URL: '+config.url);
				console.log('Chart API Error - '+response+'. Requested URL: '+config.url);
				d.reject(response);
			}
			else{
				d.resolve(response);
			}
		}

		$http.jsonp(URL+'&callback=ChartJsonpCallbackFunction',null,{cache: false})
			.success(function(response){

			});
			// .error(function(response, status, headers, config){
			// 	ErrorHandler.setError('Chart API Error - Server Replied with a '+status+' status. Requested URL: '+config.url);
			// });

		return d.promise
	}

	this.getSerieses = function(oSer){

		function emptySeries() {
			this.id = null;
			this.identifier = null;
			this.name = null;
			this.ext_name = null;
			this.color = null;
			this.zIndex = 0;
			this.data = [];
			this.showInLegend = false;
			this.currency = null;
		}

		var plottables = DataService.getPlottables();
		var serieses = [];
		var seriesesToHide = [];

		for(var i=0; i<plottables.length; i++){
			if(plottables[i].active == true){
				if(oSer.hasOwnProperty(plottables[i].SecId)){
					if(oSer[plottables[i].SecId].data.length){
						oSer[plottables[i].SecId].color = plottables[i].color;
						oSer[plottables[i].SecId].id = plottables[i].index;
						oSer[plottables[i].SecId].ext_name = oSer[plottables[i].SecId].name;
						oSer[plottables[i].SecId].name = $filter('translate')(plottables[i].type,$rootScope.config.Params.Language);
						oSer[plottables[i].SecId].zIndex = 999-i;
						serieses.push(oSer[plottables[i].SecId]);
						if(plottables[i].visible==false) seriesesToHide.push(i);
					}
				}
				else{
					// serieses.push(new emptySeries());
				}
			}
			else{
				// serieses.push(new emptySeries());
			}
		}
		// return {serieses: serieses, seriesesToHide: seriesesToHide, min: oSer.minValue, max: oSer.maxValue, dropped: oSer.dropped};
		return {serieses: serieses, seriesesToHide: seriesesToHide, min: oSer.minValue, max: oSer.maxValue, dropped: []};
	}

	this.createPeriodSelectorController = function(){
		return new PeriodSelectorController($rootScope.config.PeriodController);
	}

	var th = this;

}]);

angular.module('SDCHART').service('TabsDataService', ['$http', '$rootScope', '$q', '$log', 'ErrorHandler', 'DataService', function($http, $rootScope, $q, $log, ErrorHandler, DataService){

	this.API_getTabsData = function(oRequest) {

		var URL = $rootScope.config.URL.tabsData(oRequest.request.ISINList,oRequest.request.BMList,oRequest.request.CategoryList,$rootScope.config.Params.PerfType, DataService.plottables[0].currency, $log);	
		var d = $q.defer();	
		window.KS.needXDomain($rootScope.config.SITE_URL)&&window.KS.isIE()&&window.KS.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;

		window.TabsJsonpCallbackFunction = function(response){
			if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){
				ErrorHandler.setError('Tables API Error - '+response+'. Requested URL: '+config.url);
				console.log('Tables API Error - '+response+'. Requested URL: '+config.url);
				d.reject(response);
			}
			else{
				d.resolve(response);
			}
		}

		$http.jsonp(URL+'&callback=TabsJsonpCallbackFunction',null,{cache: false})
			.success(function(response){

			});
			// .error(function(response, status, headers, config){
			// 	ErrorHandler.setError('Chart API Error - Server Replied with a '+status+' status. Requested URL: '+config.url);
			// });

			
		return d.promise
	}

	this.getTabs = function(res){
	
		var aTabs = [];

		var getTab = function(res,sType,index,visibility){
			var oTab = {};

			oTab.visibility = visibility;
			oTab.id = index;
			oTab.type = sType;

			// Year to Year Performance TAB
			if(sType=='ytoy'){

				var performanceDate = moment(res.Tables[0].Rows[0].PerformanceDate,'DD/MM/YYYY');
				// TAB SETTINGS
				oTab.label = 'YtoY_Perf'; //
				oTab.title = [];
				oTab.title[0] = 'singleYr_Perf';
				oTab.title[1] = '5yrs';
				oTab.title[2] = 'ending';
				oTab.title[3] = performanceDate.format('MMMM');

				// TAB HEADERS
				var aHeaders = [];

				for (var i = 0; i < 5; i++) {
					aHeaders[i] = {};
				};

				aHeaders[0].Start = moment(performanceDate).subtract('years',1).add('months',1).startOf('month').format("YYYYMMDD");
				aHeaders[0].End = moment(performanceDate).subtract('years',0).endOf('month').format("YYYYMMDD");
				aHeaders[1].Start = moment(performanceDate).subtract('years',2).add('months',1).startOf('month').format("YYYYMMDD");
				aHeaders[1].End = moment(performanceDate).subtract('years',1).endOf('month').format("YYYYMMDD");
				aHeaders[2].Start = moment(performanceDate).subtract('years',3).add('months',1).startOf('month').format("YYYYMMDD");
				aHeaders[2].End = moment(performanceDate).subtract('years',2).endOf('month').format("YYYYMMDD");
				aHeaders[3].Start = moment(performanceDate).subtract('years',4).add('months',1).startOf('month').format("YYYYMMDD");
				aHeaders[3].End = moment(performanceDate).subtract('years',3).endOf('month').format("YYYYMMDD");
				aHeaders[4].Start = moment(performanceDate).subtract('years',5).add('months',1).startOf('month').format("YYYYMMDD");
				aHeaders[4].End = moment(performanceDate).subtract('years',4).endOf('month').format("YYYYMMDD");

				// for(item_ in oResp){
				// 	if(oResp.hasOwnProperty(item_)){
				// 		switch(item_){
				// 			case "Y4Start": if(typeof aHeaders[0] != 'object') aHeaders[0] = {}; aHeaders[0].Start = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;
				// 			case "Y4End": if(typeof aHeaders[0] != 'object') aHeaders[0] = {}; aHeaders[0].End = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;
				// 			case "Y3Start": if(typeof aHeaders[1] != 'object') aHeaders[1] = {}; aHeaders[1].Start = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;
				// 			case "Y3End": if(typeof aHeaders[1] != 'object') aHeaders[1] = {}; aHeaders[1].End = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;
				// 			case "Y2Start": if(typeof aHeaders[2] != 'object') aHeaders[2] = {}; aHeaders[2].Start = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;
				// 			case "Y2End": if(typeof aHeaders[2] != 'object') aHeaders[2] = {}; aHeaders[2].End = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;						
				// 			case "Y1Start": if(typeof aHeaders[3] != 'object') aHeaders[3] = {}; aHeaders[3].Start = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;
				// 			case "Y1End": if(typeof aHeaders[3] != 'object') aHeaders[3] = {}; aHeaders[3].End = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;
				// 			case "Y0Start": if(typeof aHeaders[4] != 'object') aHeaders[4] = {}; aHeaders[4].Start = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;
				// 			case "Y0End": if(typeof aHeaders[4] != 'object') aHeaders[4] = {}; aHeaders[4].End = moment(oResp[item_],'DD/MM/YYYY').format("YYYYMMDD"); break;												
				// 		}
				// 	}
				// }

				// TAB CONTENT
				var aRows = [];
				var aResp = res.Tables[3].Rows;
				var plottables = DataService.getPlottables();

				for(var j=0; j<plottables.length; j++){
					if(plottables[j].active==true){
						var elm_ = {};
						for(var i=0; i<aResp.length; i++){
							var oResp_ = aResp[i];
							if(plottables[j].identifier==oResp_['Identifier']){
								for(item_ in oResp_){
									if(oResp_.hasOwnProperty(item_)){
										switch(item_){
											case "Identifier": elm_.Identifier = oResp_[item_]; break;
											case "Name": elm_.Name = oResp_[item_]; break;
											case "Y0": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[0] = oResp_[item_]; break;
											case "Y1": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[1] = oResp_[item_]; break;
											case "Y2": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[2] = oResp_[item_]; break;
											case "Y3": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[3] = oResp_[item_]; break;
											case "Y4": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[4] = oResp_[item_]; break;					
										}
									}
								}
								elm_.Color = plottables[j].color;
								elm_.Index = plottables[j].index;
								elm_.Type = plottables[j].type;
								elm_.Visible = plottables[j].visible;
								if(!elm_.hasOwnProperty('Name')) elm_.Name =  plottables[j].type.charAt(0).toUpperCase() + plottables[j].type.slice(1)+" "+elm_.Identifier; 
								if(elm_.Type == 'fund'){
									if(elm_.Name.toLowerCase().indexOf('fund')==-1) elm_.Name += ' Fund';
								}
								aRows.push(elm_);
								break;	
							}
						}
					}
				}
				oTab.headers = aHeaders;
				oTab.data = aRows;
			}

			// Calendar Year Performance TAB
			if(sType=='calyr'){
				// TAB SETTINGS
				oTab.label = 'calYr_Perf'; // TO BE TRANSLATED
				oTab.title = [];
				oTab.title[0] = 'performances';
				oTab.title[1] = 'asAt';
				oTab.title[2] = moment(res.Tables[0].Rows[0].PerformanceDate,'DD/MM/YYYY').format('DD/MM/YYYY');

				// TAB HEADERS
				var aHeaders = [];
				var oResp = res.Tables[1].Rows[0];
				var Obj = {};

				for(item_ in oResp){
					if(oResp.hasOwnProperty(item_)){
						// switch(item_){
						// 	case "C4": if(typeof aHeaders[5] != 'object') aHeaders[5] = {}; aHeaders[5].Year = oResp[item_]; break;
						// 	case "C3": if(typeof aHeaders[4] != 'object') aHeaders[4] = {}; aHeaders[4].Year = oResp[item_]; break;
						// 	case "C2": if(typeof aHeaders[3] != 'object') aHeaders[3] = {}; aHeaders[3].Year = oResp[item_]; break;
						// 	case "C1": if(typeof aHeaders[2] != 'object') aHeaders[2] = {}; aHeaders[2].Year = oResp[item_]; break;
						// 	case "C0": if(typeof aHeaders[1] != 'object')
						// 			         aHeaders[1] = {}; aHeaders[1].Year = oResp[item_];
						// 			         aHeaders[0] = {}; aHeaders[0].Year = 'YTD '+moment(oResp[item_],'YYYY').add('years', 1).format('YYYY');
						// 		         break;
						// }
						switch(item_){
							case "C4": if(typeof aHeaders[4] != 'object') aHeaders[4] = {}; aHeaders[4].Year = oResp[item_]; break;
							case "C3": if(typeof aHeaders[3] != 'object') aHeaders[3] = {}; aHeaders[3].Year = oResp[item_]; break;
							case "C2": if(typeof aHeaders[2] != 'object') aHeaders[2] = {}; aHeaders[2].Year = oResp[item_]; break;
							case "C1": if(typeof aHeaders[1] != 'object') aHeaders[1] = {}; aHeaders[1].Year = oResp[item_]; break;
							case "C0": if(typeof aHeaders[0] != 'object') aHeaders[0] = {}; aHeaders[0].Year = oResp[item_]; break;
						}
					}
				}

				// TAB CONTENT
				var aRows = [];
				var aResp = res.Tables[2].Rows;
				var plottables = DataService.getPlottables();

				for(var j=0; j<plottables.length; j++){
					if(plottables[j].active==true){
						var elm_ = {};
						for(var i=0; i<aResp.length; i++){
							var oResp_ = aResp[i];
							if(plottables[j].identifier==oResp_['Identifier']){
								for(item_ in oResp_){
									if(oResp_.hasOwnProperty(item_)){
										// switch(item_){
										// 	case "Identifier": elm_.Identifier = oResp_[item_]; break;
										// 	case "Name": elm_.Name = oResp_[item_]; break;
										// 	case "C4": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[5] = oResp_[item_]; break;
										// 	case "C3": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[4] = oResp_[item_]; break;
										// 	case "C2": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[3] = oResp_[item_]; break;
										// 	case "C1": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[2] = oResp_[item_]; break;
										// 	case "C0": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[1] = oResp_[item_]; break;			
										// 	case "YTD": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[0] = oResp_[item_]; break;
										// }
										switch(item_){
											case "Identifier": elm_.Identifier = oResp_[item_]; break;
											case "Name": elm_.Name = oResp_[item_]; break;
											case "C4": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[4] = oResp_[item_]; break;
											case "C3": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[3] = oResp_[item_]; break;
											case "C2": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[2] = oResp_[item_]; break;
											case "C1": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[1] = oResp_[item_]; break;
											case "C0": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[0] = oResp_[item_]; break;			
										}
									}
								}
								elm_.Color = plottables[j].color;
								elm_.Index = plottables[j].index;
								elm_.Type = plottables[j].type;
								elm_.Visible = plottables[j].visible;
								if(!elm_.hasOwnProperty('Name')) elm_.Name =  plottables[j].type.charAt(0).toUpperCase() + plottables[j].type.slice(1)+" "+elm_.Identifier; 
								if(elm_.Type == 'fund'){
									if(elm_.Name.toLowerCase().indexOf('fund')==-1) elm_.Name += ' Fund';
								}
								aRows.push(elm_);
								break;	
							}
						}
					}
				}
				oTab.headers = aHeaders;
				oTab.data = aRows;
			}

			// Cumulative Performance TAB
			if(sType=='cum'){
				// TAB SETTINGS
				oTab.label = 'cum_perf'; // TO BE TRANSLATED
				oTab.title = [];
				oTab.title[0] = 'performances';
				oTab.title[1] = 'asAt';
				oTab.title[2] = moment(res.Tables[0].Rows[0].PerformanceDate,'DD/MM/YYYY').format('DD/MM/YYYY');

				// var ytd_year = moment(res.Tables[0].Rows[0].PerformanceDate,'DD/MM/YYYY').format('YYYY'); PUT IT BACK FOR YTD

				// TAB HEADERS
				// var aHeaders = [
				// 				{period: 'YTD '+ytd_year}
				// 				,{period: '1Y'}
				// 				,{period: '3Y'}
				// 				,{period: '5Y'}
				// 				,{period: 'sinceInception'}
				// ];
				var aHeaders = [
								{period: '1Y'}
								,{period: '3Y'}
								,{period: '5Y'}
								,{period: 'sinceInception'}
				];

				// TAB CONTENT
				var aRows = [];
				var aResp = res.Tables[2].Rows;
				var plottables = DataService.getPlottables();

				for(var j=0; j<plottables.length; j++){
					if(plottables[j].active==true){
						var elm_ = {};
						for(var i=0; i<aResp.length; i++){
							var oResp_ = aResp[i];
							if(plottables[j].identifier==oResp_['Identifier']){
								for(item_ in oResp_){
									if(oResp_.hasOwnProperty(item_)){
										// switch(item_){
										// 	case "Identifier": elm_.Identifier = oResp_[item_]; break;
										// 	case "Name": elm_.Name = oResp_[item_]; break;
										// 	case "One_Year": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[1] = oResp_[item_]; break;
										// 	case "Three_Years": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[2] = oResp_[item_]; break;
										// 	case "Five_Years": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[3] = oResp_[item_]; break;
										// 	case "YTD": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[0] = oResp_[item_]; break;
										// 	case "Since_Inception": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[4] = oResp_[item_]; break;
										// }
										switch(item_){
											case "Identifier": elm_.Identifier = oResp_[item_]; break;
											case "Name": elm_.Name = oResp_[item_]; break;
											case "One_Year": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[0] = oResp_[item_]; break;
											case "Three_Years": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[1] = oResp_[item_]; break;
											case "Five_Years": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[2] = oResp_[item_]; break;
											case "Since_Inception": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[3] = oResp_[item_]; break;
										}
									}
								}
								elm_.Color = plottables[j].color;
								elm_.Index = plottables[j].index;
								elm_.Type = plottables[j].type;
								elm_.Visible = plottables[j].visible;
								if(!elm_.hasOwnProperty('Name')) elm_.Name =  plottables[j].type.charAt(0).toUpperCase() + plottables[j].type.slice(1)+" "+elm_.Identifier; 
								if(elm_.Type == 'fund'){
									if(elm_.Name.toLowerCase().indexOf('fund')==-1) elm_.Name += ' Fund';
								}
								aRows.push(elm_);
								break;	
							}
						}
					}
				}
				oTab.headers = aHeaders;
				oTab.data = aRows;
			}

			// Risk Measure for the fund TAB
			if(sType=='risk'){
				// TAB SETTINGS
				oTab.label = 'riskMeasure'; // TO BE TRANSLATED
				//oTab.title = 'Performances   '+moment(res.Tables[0].Rows[0].PerformanceDate,'DD/MM/YYYY').format('DD/MM/YYYY');// TO BE TRANSLATED

				oTab.title = [];
				oTab.title[0] = 'asAt';
				oTab.title[1] = moment(res.Tables[0].Rows[0].PerformanceDate,'DD/MM/YYYY').format('DD/MM/YYYY');

				// TAB HEADERS
				var aHeaders = [
								{label: 'volatility', tooltip: 'volatilityTooltip'}
								,{label: 'sharpRatio', tooltip: 'sharpRatioTooltip'}
								,{label: 'beta', tooltip: 'betaTooltip'}
								,{label: 'duration', tooltip: 'durationTooltip'}
				];

				// TAB CONTENT
				var aRows = [];
				var aResp = res.Tables[4].Rows;
				var plottables = DataService.getPlottables();

				for(var j=0; j<plottables.length; j++){
					if(plottables[j].active==true){
						var elm_ = {};
						for(var i=0; i<aResp.length; i++){
							var oResp_ = aResp[i];
							if(plottables[j].SecId==oResp_['FundShareClassId']){
								for(item_ in oResp_){
									if(oResp_.hasOwnProperty(item_)){
										switch(item_){
											case "FundShareClassId": elm_.Identifier = oResp_[item_]; break;
											case "FundName": elm_.Name = oResp_[item_]; break;
											case "StandardDeviation": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[0] = oResp_[item_]; break;
											case "SharpeRatio": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[1] = oResp_[item_]; break;
											case "Beta_RL": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[2] = oResp_[item_]; break;
											case "ModifiedDuration": if(typeof elm_.Values != 'object') elm_.Values = []; elm_.Values[3] = oResp_[item_]; break;
										}
									}
								}
								elm_.Color = plottables[j].color;
								elm_.Index = plottables[j].index;
								elm_.Type = plottables[j].type;
								elm_.Visible = plottables[j].visible;
								if(!elm_.hasOwnProperty('Name')) elm_.Name =  plottables[j].type.charAt(0).toUpperCase() + plottables[j].type.slice(1)+" "+elm_.Identifier; 
								if(elm_.Type == 'fund'){
									if(elm_.Name.toLowerCase().indexOf('fund')==-1) elm_.Name += ' Fund';
								}
								aRows.push(elm_);
								break;	
							}
						}
					}
				}
				oTab.headers = aHeaders;
				oTab.data = aRows;
			}

			return oTab;
		}

		for(var i=0; i<DataService.tabs.length; i++){
			var visibility = false;
			if(i==0) visibility = true;
			aTabs.push(getTab(res,DataService.tabs[i],i,visibility));
		}

		return aTabs;
	}

}]);

angular.module('SDCHART').service('SearchBarDataService', ['$http', '$rootScope', '$q', '$filter', '$log','ErrorHandler', 'DataService', function($http, $rootScope, $q, $filter, $log, ErrorHandler, DataService){

	
	// TO DO
	this.API_getInitList = function(oRequest){
		// API CALL TO BE IMPLEMENTED
		var URL = $rootScope.config.URL.fundsList(oRequest.clientTypeID,oRequest.countryID,oRequest.languageID, $log);	
		var d = $q.defer();	
		window.KS.needXDomain($rootScope.config.OptionsURL)&&window.KS.isIE()&&window.KS.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;
		window.InitListJsonpCallbackFunction = function(response){
			if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){
				ErrorHandler.setError('Options Funds List API Error - '+response+'. Requested URL: '+config.url);
				console.log('Options Funds List API Error - '+response+'. Requested URL: '+config.url);
				d.reject(response);
			}
			else{
				d.resolve(response);
			}
		}
		$http.jsonp(URL+'&callback=InitListJsonpCallbackFunction',null,{cache: false})
			.success(function(response){

			});

		return d.promise

	}

	this.parseResults = function(oRes){

		// OBJECT TO KEEP TRACK OF CATEGORY PRESENT IN THE LIST
		var oCatCheck = {
			'I': false,
			'S': false,
			'A': false,
			'B': false
		};

		var aList = oRes.Tables[0].Rows;

		// BUILD TYPEAHEAD
		for(var i=0; i<aList.length; i++){
			var sType = '';
			switch(aList[i].Type){
				case "F": sType = $filter('translate')('fund'); break;
				case "S": sType = $filter('translate')('morningstarCategory'); oCatCheck[aList[i].Type] = true; break;
				case "I": sType = $filter('translate')('IMASector'); oCatCheck[aList[i].Type] = true; break;
				case "A": sType = $filter('translate')('ABISector'); oCatCheck[aList[i].Type] = true; break;
				case "B": sType = $filter('translate')('indices'); oCatCheck[aList[i].Type] = true; break;
			}
			aList[i]['Typeahead']=aList[i].Name+' ('+aList[i].Identifier+') '+sType;
		}

		// BUILD ELEMENTS OBJECT
		var hiddenElement = $rootScope.config.Params.HiddenElement;
		var elements = [];
		var oElements;
		var elementStructure = $rootScope.config.Cat;
		if(hiddenElement.length == 2 && hiddenElement.indexOf('benchmark') != -1 && hiddenElement.indexOf('sector') != -1) {
			oElements = false;
		}
		else {
			for(var i=0; i<elementStructure.length; i++){
				if(hiddenElement.indexOf(elementStructure[i].belongTo)==-1 && oCatCheck[elementStructure[i].value] == true){
					elements.push(elementStructure[i]);
				}
			}
			oElements = elements;
		}

		return {searchList: aList, elements: oElements}
	}

}]);

angular.module('SDCHART').service('ErrorHandler', ['$http', '$q', '$log', function($http, $q, $log){

	this.error = [];
	var th = this;

	//todo
	this.setError = function(error_){
		th.error.push(error_);
		console.log('Error: '+error_);
	}

	this.isError = function(){
		if(th.error.length) return true;
	}

	this.getError = function(){
		if(th.error.length) {
			$log.debug('Error ->',th.error);
			return th.error;
		}
	}

}]);

angular.module('SDCHART').service('OptionsPageService', ['$http', '$rootScope', '$q', '$log', 'ErrorHandler', function($http, $rootScope, $q, $log, ErrorHandler){

	this.API_getOptionsClientType = function(oRequest) {
		var URL = $rootScope.config.URL.optionsClientType($log);	
		var d = $q.defer();	
		window.KS.needXDomain($rootScope.config.OptionsURL)&&window.KS.isIE()&&window.KS.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;
		window.OptClientTypeJsonpCallbackFunction = function(response){
			if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){
				ErrorHandler.setError('Options Client Type API Error - '+response+'. Requested URL: '+config.url);
				console.log('Options Client Type API Error - '+response+'. Requested URL: '+config.url);
				d.reject(response);
			}
			else{
				d.resolve(response);
			}
		}
		
		$http.jsonp(URL+'&callback=OptClientTypeJsonpCallbackFunction',null,{cache: false})
			.success(function(response){

			});

		return d.promise
	}

	this.API_getOptionsCountry = function(oRequest) {
		var URL = $rootScope.config.URL.optionsCountry(oRequest.clientTypeID, $log);	
		var d = $q.defer();	
		window.KS.needXDomain($rootScope.config.OptionsURL)&&window.KS.isIE()&&window.KS.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;
		window.OptCountryJsonpCallbackFunction = function(response){
			if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){
				ErrorHandler.setError('Options Country API Error - '+response+'. Requested URL: '+config.url);
				console.log('Options Country API Error - '+response+'. Requested URL: '+config.url);
				d.reject(response);
			}
			else{
				d.resolve(response);
			}
		}

		$http.jsonp(URL+'&callback=OptCountryJsonpCallbackFunction',null,{cache: false})
			.success(function(response){

			});

		return d.promise
	}

	this.API_getOptionsLanguage = function(oRequest) {
		var URL = $rootScope.config.URL.optionsLanguage(oRequest.clientTypeID,oRequest.countryID, $log);	
		var d = $q.defer();	
		window.KS.needXDomain($rootScope.config.OptionsURL)&&window.KS.isIE()&&window.KS.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;
		window.OptLanguageJsonpCallbackFunction = function(response){
			if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){
				ErrorHandler.setError('Options Language API Error - '+response+'. Requested URL: '+config.url);
				console.log('Options Language API Error - '+response+'. Requested URL: '+config.url);
				d.reject(response);
			}
			else{
				d.resolve(response);
			}
		}

		$http.jsonp(URL+'&callback=OptLanguageJsonpCallbackFunction',null,{cache: false})
			.success(function(response){

			});

		return d.promise
	}

	this.API_getOptionsFund = function(oRequest) {
		var URL = $rootScope.config.URL.optionsFund(oRequest.clientTypeID,oRequest.countryID,oRequest.languageID, $log);	
		var d = $q.defer();	
		window.KS.needXDomain($rootScope.config.OptionsURL)&&window.KS.isIE()&&window.KS.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;
		window.OptFundTypeJsonpCallbackFunction = function(response){
			if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){
				ErrorHandler.setError('Options Funds List API Error - '+response+'. Requested URL: '+config.url);
				console.log('Options Funds List API Error - '+response+'. Requested URL: '+config.url);
				d.reject(response);
			}
			else{
				d.resolve(response);
			}
		}
		$http.jsonp(URL+'&callback=OptFundTypeJsonpCallbackFunction',null,{cache: false})
			.success(function(response){

			});

		return d.promise
	}

	

}]);

angular.module('SDCHART').service('DatePickerService', [function(){

	// This service is needed to use the DatePicker directive

}]);

angular.module('SDCHART').service('MessageHandler', ['$log', function($log){

	this.MessagePool = [];
	this.status = null;
	th = this;

	this.pushMessage = function(message,priority){
		// This method accepts a string or an Array of strings as parameter
		if(typeof message === 'string'){
			th.MessagePool.push({message: message, shown: false});
		}
		else{
			for(var i=0; i<message.length; i++){
				th.MessagePool.push({message: message[i], shown: false});
			}
		}
		if(priority) th.status = moment.utc().valueOf();
	}

	this.updateStatus = function(){
		th.status = moment.utc().valueOf();
	}

	this.getMessage = function(){
		// This method returns the messages' Array
		var aMessage = [];
		for (var i = 0; i < th.MessagePool.length; i++) {
			if(th.MessagePool[i].shown == false) {
				aMessage.push(th.MessagePool[i]);
				th.MessagePool[i].shown = true;
			}
		};
		if(aMessage.length > 0){
			$log.debug('Message ->',aMessage);
			return aMessage;
		}
		else{
			return false;
		}
	}

}]);

