/*************************************************************************** 
Static&Dynamic Charting Widgets
App Directives
*****************************************************************************/

angular.module('sdchart.directives', [
    'sdchart.static.widget', 'sdchart.dynamic.widget', 'sdchart.entrycharge.widget'
    //,'sdchart.options.widget'
    , 'sdchart.highcharts', 'sdchart.perftab', 'sdchart.tablerow', 'sdchart.tablabel', 'sdchart.buttons', 'sdchart.charttools'
    //,'ui.kurtosys.select'
    , 'ui.select2', 'ui.bootstrap.typeahead', 'ks.datepicker', 'ks.flashingmessage', 'ngEnter', 'sdchart.options.widget'
    //,'mgcrea.ngStrap.datepicker'
    //,'ngAutocomplete'

]);

angular.module('sdchart.static.widget', [])
    .directive('ksWidgetSdStatic', ['$rootScope', '$translate', '$timeout', 
        function($rootScope, $translate, $timeout) {

            $rootScope.config = new SDCHART_STATIC_CONFIG();

            return {
                restrict: 'C',
                template: $rootScope.config.Template.Main,
                replace: true,
                link: function(scope, element, attr) {

                    $rootScope.config.Params.Country = '';
                    $rootScope.config.Params.Website = '';
                    $rootScope.config.Params.Language = '';
                    $rootScope.config.Params.Fund = [];
                    $rootScope.config.Params.Benchmark = [];
                    $rootScope.config.Params.Sector = [];
                    $rootScope.config.Params.Category = [];
                    $rootScope.config.Params.HiddenTab = [];
                    $rootScope.config.Params.HiddenElement = [];
                    $rootScope.config.Params.PerfType = '';

                    // override default config with values from widget config
                    if (attr.country != undefined && attr.country != '') {
                        $rootScope.config.Params.Country = attr.country;
                    }
                    if (attr.website != undefined && attr.website != '') {
                        $rootScope.config.Params.Website = attr.website;
                    }
                    if (attr.language != undefined && attr.language != '') {
                        $rootScope.config.Params.Language = attr.language;
                    }
                    if (attr.isin != undefined && attr.isin != '') {
                        $rootScope.config.Params.Fund = attr.isin.split(",");
                    }
                    if (attr.benchmark != undefined && attr.benchmark != '') {
                        $rootScope.config.Params.Benchmark = attr.benchmark.split(",");
                    }
                    if (attr.sector != undefined && attr.sector != '') {
                        $rootScope.config.Params.Sector = attr.sector.split(",");
                    }
                    // category is overridden by sector if both are present
                    if (attr.category != undefined && attr.category != '' && $rootScope.config.Params.Sector.length == 0) {
                        $rootScope.config.Params.Category = attr.category.split(",");
                    }
                    if (attr.hidetab != undefined && attr.hidetab != '') {
                        $rootScope.config.Params.HiddenTab = attr.hidetab.split(",");
                    }
                    if (attr.hideelement != undefined && attr.hideelement != '') {
                        $rootScope.config.Params.HiddenElement = attr.hideelement.split(",");
                    }
                    if (attr.perftype != undefined && attr.perftype != '') {
                        $rootScope.config.Params.PerfType = attr.perftype;
                    }

                    // Setting the language into the translateProvider
                    // $translate.uses($rootScope.config.Params.Language);
                    // Setting the language into momentjs and numeraljs
                    $timeout(function() {
                        moment.lang($rootScope.config.Params.Language)
                    });
                    numeral.language($rootScope.config.Params.Language);
                }
            }
        }
    ]);


angular.module('sdchart.dynamic.widget', [])
    .directive('ksWidgetSdDynamic', ['$rootScope', '$translate', '$timeout',
        function($rootScope, $translate, $timeout) {

            $rootScope.config = new SDCHART_DYNAMIC_CONFIG();

            return {
                restrict: 'C',
                template: $rootScope.config.Template.Main,
                replace: true,
                link: function(scope, element, attr) {

                    $rootScope.config.Params.Country = '';
                    $rootScope.config.Params.Website = '';
                    $rootScope.config.Params.Language = '';
                    $rootScope.config.Params.Fund = [];
                    $rootScope.config.Params.Benchmark = [];
                    $rootScope.config.Params.Sector = [];
                    $rootScope.config.Params.Category = [];
                    $rootScope.config.Params.HiddenTab = [];
                    $rootScope.config.Params.HiddenElement = [];
                    $rootScope.config.Params.PerfType = '';

                    // override default config with values from widget config
                    if (attr.country != undefined && attr.country != '') {
                        $rootScope.config.Params.Country = attr.country;
                    }
                    if (attr.website != undefined && attr.website != '') {
                        $rootScope.config.Params.Website = attr.website;
                    }
                    if (attr.language != undefined && attr.language != '') {
                        $rootScope.config.Params.Language = attr.language;
                    }
                    if (attr.isin != undefined && attr.isin != '') {
                        $rootScope.config.Params.Fund = attr.isin.split(",");
                    }
                    if (attr.benchmark != undefined && attr.benchmark != '') {
                        $rootScope.config.Params.Benchmark = attr.benchmark.split(",");
                    }
                    if (attr.sector != undefined && attr.sector != '') {
                        $rootScope.config.Params.Sector = attr.sector.split(",");
                    }
                    // category is overridden by sector if both are present
                    if (attr.category != undefined && attr.category != '' && $rootScope.config.Params.Sector.length == 0) {
                        $rootScope.config.Params.Category = attr.category.split(",");
                    }
                    if (attr.hidetab != undefined && attr.hidetab != '') {
                        $rootScope.config.Params.HiddenTab = attr.hidetab.split(",");
                    }
                    if (attr.hideelement != undefined && attr.hideelement != '') {
                        $rootScope.config.Params.HiddenElement = attr.hideelement.split(",");
                    }
                    if (attr.perftype != undefined && attr.perftype != '') {
                        $rootScope.config.Params.PerfType = attr.perftype;
                    }

                    // Setting the language into the translateProvider
                    // $translate.uses($rootScope.config.Params.Language);
                    // Setting the language into momentjs and numeraljs
                    $timeout(function() {
                        moment.lang($rootScope.config.Params.Language)
                    });
                    numeral.language($rootScope.config.Params.Language);
                }
            }
        }
    ]);

angular.module('sdchart.highcharts', [])
    .directive('linechart', ['$rootScope', '$timeout', '$filter', 'MessageHandler',
        function($rootScope, $timeout, $filter, MessageHandler) {
            var r = Math.floor(Math.random() * 1001);
            return {
                restrict: 'A',
                template: '<div id="perfchart-' + r + '"></div>',
                replace: true,
                link: function(scope, element, attr) {
                    scope.$watch('DataService.status.chart', function(value, oldValue) {
                        if (value != "" && value != oldValue) {
                            //FAKE TITLE TRANSLATION TO BE REMOVED ONCE TRANSLATION APPLIED
                            var title = $filter('translate')('totalReturn', $rootScope.config.Params.Language);
                            var subtitle = $filter('translate')('indexed100', $rootScope.config.Params.Language);

                            switch (scope.DataService.PeriodRequested.period.label) {
                                // case "10Y": title+=' '+$filter('translate')('over',$rootScope.config.Params.Language)+' '+$filter('translate')('10yrs',$rootScope.config.Params.Language);break;
                                // case "5Y": title+=' '+$filter('translate')('over',$rootScope.config.Params.Language)+' '+$filter('translate')('5yrs',$rootScope.config.Params.Language);break;
                                // case "3Y": title+=' '+$filter('translate')('over',$rootScope.config.Params.Language)+' '+$filter('translate')('3yrs',$rootScope.config.Params.Language);break;
                                // case "ALL": title+=' '+$filter('translate')('sinceInception',$rootScope.config.Params.Language); break;
                            }
                            if (scope.DataService.isDynamic()) {
                                title = '';
                                subtitle = '';
                            }
                            if (scope.DataService.isDynamic()) {
                                scope.chart.serieses[0].type = 'area';
                                scope.chart.serieses[0].zIndex = 0;
                                scope.chart.serieses[0].fillColor = {
                                    pattern: '__DEPLOYMENTURL__/_images/mandg_dark_blue_tile.gif',
                                    // pattern: '__DEPLOYMENTURL__/_images/vanilla_dark_blue_tile.png',
                                    width: 5,
                                    height: 5
                                };
                                $rootScope.config.Chart.chart.width = element.parent().parent().width();
                            }
                            $rootScope.config.Chart.yAxis.min = scope.chart.min;
                            $rootScope.config.Chart.yAxis.max = scope.chart.max;
                            scope.chart.highchart = KSCHART.drawLineChart('perfchart-' + r, $rootScope.config.Chart, title, subtitle, scope.chart.serieses, true);
                            for (var i = 0; i < scope.chart.seriesesToHide.length; i++) {
                                scope.chart.highchart.series[scope.chart.seriesesToHide[i]].hide();
                            }
                            if (scope.chart.dropped.length > 0) {
                                // TO BE TRANSLATED
                                MessageHandler.pushMessage($filter('translate')('msgItemsDroppedOff', $rootScope.config.Params.Language));
                                for (var i = 0; i < scope.chart.dropped.length; i++) {
                                    MessageHandler.pushMessage(scope.chart.dropped[i]);
                                }
                            }
                            scope.DataService.storeChart(scope.chart.highchart);
                            scope.DataService.setLoading('chart', 'init', false);
                            $timeout(function() {
                                scope.DataService.setLoading('chart', 'reload', false);
                            }, 1200);

                        }
                    });

                }
            }
        }
    ]);

angular.module('sdchart.highcharts')
    .directive('barchart', ['$rootScope', '$timeout', '$filter', 'MessageHandler',
        function($rootScope, $timeout, $filter, MessageHandler) {
            var r = Math.floor(Math.random() * 1001);
            return {
                restrict: 'A',
                template: '<div id="entrychargechart-' + r + '"></div>',
                replace: true,
                link: function(scope, element, attr) {
                    scope.$watch('entryChargeData', function(value, oldValue) {
                        if (value != "" && value != null && value != oldValue) {
                            //FAKE TITLE TRANSLATION TO BE REMOVED ONCE TRANSLATION APPLIED
                            var title = $filter('translate')('entCrtHeader', $rootScope.config.Params.Language)
                            + " (" + $filter('translate')('over', $rootScope.config.Params.Language) + " " + scope.entryChargeData.details.Years
                            + " " + $filter('translate')('year', $rootScope.config.Params.Language) + ", " + $filter('translate')('entCrtAsOf', $rootScope.config.Params.Language) + " " + moment(scope.entryChargeData.details.AsOf,'DD/MM/YYYY').format("MMM")
                            +")";
                            var subtitle = '';

                            // $rootScope.config.Chart.chart.width = element.parent().parent().width();

                            scope.entryChargeData.highchart = KSCHART.drawBarChart('entrychargechart-' + r, $rootScope.config.Chart, title, subtitle, scope.entryChargeData.categories, scope.entryChargeData.serieses, true);

                            scope.DataService.storeChart(scope.entryChargeData.highchart);
                            scope.DataService.setLoading('chart', 'init', false);
                        }
                    });

                }
            }
        }
    ]);

angular.module('sdchart.perftab', [])
    .directive('perfTab', ['$compile',
        function($compile) {
            return {
                restrict: 'A',
                replace: true,
                link: function(scope, element, attr) {
                    if (scope.compile[attr.type] != true) {
                        angular.element('[tab-' + attr.type + ']').remove();
                        angular.element(element).append('<div tab-' + attr.type + '></div>');
                        scope.compile[attr.type] = true;

                        $compile(element.children(1))(scope);
                    }
                }
            }
        }
    ]);

angular.module('sdchart.perftab')
    .directive('tabYtoy', ['$rootScope',
        function($rootScope) {
            return {
                restrict: 'A',
                templateUrl: $rootScope.config.Template.Tabs.YtoY,
                replace: true,
                compile: function(element, attr) {

                }
            }
        }
    ]);

angular.module('sdchart.perftab')
    .directive('tabCalyr', ['$rootScope',
        function($rootScope) {
            return {
                restrict: 'A',
                templateUrl: $rootScope.config.Template.Tabs.CalYr,
                replace: true,
                compile: function(element, attr) {

                }
            }
        }
    ]);

angular.module('sdchart.perftab')
    .directive('tabCum', ['$rootScope',
        function($rootScope) {
            return {
                restrict: 'A',
                templateUrl: $rootScope.config.Template.Tabs.Cumul,
                replace: true,
                compile: function(element, attr) {

                }
            }
        }
    ]);

angular.module('sdchart.perftab')
    .directive('tabRisk', ['$rootScope',
        function($rootScope) {
            return {
                restrict: 'A',
                templateUrl: $rootScope.config.Template.Tabs.Risk,
                replace: true,
                compile: function(element, attr) {

                }
            }
        }
    ]);

angular.module('sdchart.tablerow', [])
    .directive('tableRow', ['$rootScope','$filter','MessageHandler',

        function($rootScope,$filter,MessageHandler) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {

                    scope.showRemove = false;
                    scope.MessageHandler = MessageHandler;

                    scope.toggleSeries = function(sWidgetType) {
                        var chart = scope.DataService.getChart();
                        var index = this.row.Index;
                        if (index != 0) {
                            //var index = this.row.Index;
                            if (scope.DataService.toggleSeries(index)) {
                                angular.element(element.parents()[4]).find('tr[rowid=' + index + ']').removeClass("hidden");
                                chart.series[index].show();
                                scope.highlightSeries(sWidgetType);
                            } else {
                                angular.element(element.parents()[4]).find('tr[rowid=' + index + ']').addClass("hidden");
                                chart.series[index].hide();
                                scope.restoreTickness(sWidgetType);
                            }
                        }
                    }

                    scope.deleteSeries = function(sWidgetType) {
                        var checkPlottable = scope.DataService.checkPlottable(this.row);
                        if(checkPlottable.status) {
                            if(checkPlottable.last) {
                                scope.DataService.resetWidget();
                                scope.DataService.status.fundAdded = false;
                                // Setting the request to Default
                                scope.ChartDataService.setPeriodRequest(true);
                            }
                            else{
                                scope.DataService.deleteSeries(this.row.Index, this.row.Identifier);
                                // Setting the Loading to true for both charts and tabs
                                scope.DataService.setLoading('chart', 'reload', true);
                                scope.DataService.setLoading('tabs', 'reload', true);
                                // Setting the request to Default
                                scope.ChartDataService.setPeriodRequest(true);
                            }
                        }
                        else{
                            scope.MessageHandler.pushMessage($filter('translate')(checkPlottable.error,$rootScope.config.Params.Language),true);
                        }                        
                    }

                    scope.highlightSeries = function(sWidgetType) {
                        var chart = scope.DataService.getChart();
                        var index = this.row.Index;
                        var plottables = scope.DataService.getPlottables();

                        if (sWidgetType == 'static') {
                            if (plottables[index].visible == true) {
                                for (var i = 0; i < plottables.length; i++) {
                                    if (i == index) {
                                        chart.series[i].update({
                                            lineWidth: 3,
                                            color: plottables[i].color,
                                            zIndex: 1000
                                        });
                                    } else {
                                        if (plottables[i].active == true) {
                                            chart.series[i].update({
                                                lineWidth: 3,
                                                color: plottables[i].color03Opacity,
                                                zIndex: 999 - i
                                            });
                                        }
                                    }
                                }
                            } else {
                                scope.restoreTickness(sWidgetType);
                            }
                        } else if (sWidgetType == 'dynamic') {
                            if (index != 0) {
                                if (plottables[index].visible == true) {
                                    for (var i = 0; i < plottables.length; i++) {
                                        if (i == index) {
                                            chart.series[i].update({
                                                lineWidth: 3,
                                                color: plottables[i].color,
                                                zIndex: 1000
                                            });
                                        } else {
                                            if (plottables[i].active == true && i != 0) {
                                                chart.series[i].update({
                                                    lineWidth: 3,
                                                    color: plottables[i].color03Opacity,
                                                    zIndex: 999 - i
                                                });
                                            }
                                        }
                                    }
                                } else {
                                    scope.restoreTickness(sWidgetType);
                                }
                            }
                        }
                    }

                    scope.restoreTickness = function(sWidgetType) {
                        //scope.timedOutFunction = setTimeout(function() { 
                        var chart = scope.DataService.getChart();
                        var plottables = scope.DataService.getPlottables();
                        //if(plottables[index].visible!=true){
                        if (sWidgetType == 'static') {
                            for (var i = 0; i < plottables.length; i++) {
                                if (plottables[i].active == true) {
                                    chart.series[i].update({
                                        lineWidth: 3,
                                        color: plottables[i].color,
                                        zIndex: 999 - i
                                    });
                                }
                            }
                        } else if (sWidgetType == 'dynamic') {
                            for (var i = 0; i < plottables.length; i++) {
                                if (plottables[i].active == true && i != 0) {
                                    chart.series[i].update({
                                        lineWidth: 3,
                                        color: plottables[i].color,
                                        zIndex: 999 - i
                                    });
                                }
                            }
                        }

                        //}
                        //}, 350);
                    }

                    scope.applyClass = function(type, index, visibility) {
                        if (type == 'fund' && index == '0') {
                            return 'mgt--bluetile';
                        }
                        if (visibility == false) {
                            return 'hidden';
                        }
                    }

                    scope.toggleRemove = function(flag) {
                        scope.showRemove = flag;
                    }

                }
            }
        }
    ]);

angular.module('sdchart.tablabel', [])
    .directive('tabLabel', [

        function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {

                    scope.isActive = function(index) {
                        if (index) {
                            return "tab-active";
                        } else {
                            return "";
                        }
                    }

                    scope.toggleTab = function(index) {

                        for (var i = 0; i < scope.tabs.length; i++) {
                            if (i == index) {
                                scope.tabs[i].visibility = true;
                            } else {
                                scope.tabs[i].visibility = false;
                            }
                        }

                        //scope.$apply(scope.tabs);
                    }

                }
            }
        }
    ]);

/*
	angular.module('sdchart.charttools', [])
	.directive('myClass', function(){
		return {
			restrict:'A',
			scope: true,
			replace: false,
			link: function(scope,element,attr,ctrl) {
				test = true;
				scope.$watchCollection('scope.PeriodSelector.Data', function() {
					if(scope.PeriodSelector.Data != undefined){
						scope.activeClass = "";
					}
				},true);

			}
		}
	});*/


angular.module('sdchart.charttools', [])
    .directive('chartTools', [

        function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {

                    scope.periodClasses = {};

                    scope.addPeriod = function(sPeriod) {
                        scope.periodClasses[sPeriod] = '';
                    }

                    scope.setPeriodToPlot = function(sPeriod) {
                        if (scope.PeriodSelector.Data != undefined && scope.PeriodSelector.Data.plot.period.label != sPeriod) {
                            if (scope.PeriodSelector.Data.list[sPeriod].available) {
                                // Setting the request to User Choice and sending the Period to Plot
                                scope.ChartDataService.setPeriodRequest(false, sPeriod);
                                // Setting the Loading to true for both charts and tabs
                                scope.DataService.setLoading('chart', 'reload', true);
                                scope.DataService.setLoading('tabs', 'reload', true);
                                scope.DataService.status.valid = moment.utc().valueOf();
                            }
                        }
                    }

                    scope.$watchCollection('scope.PeriodSelector.Data', function(value, oldValue) {
                        if (value != undefined) {
                            for (period in scope.periodClasses) {
                                if (!scope.PeriodSelector.Data.list[period].available) scope.periodClasses[period] += 'unavailable ';
                                if (period == scope.PeriodSelector.Data.toplot.period.label) scope.periodClasses[period] += 'active ';
                            }
                        }
                    }, true);

                }
            }
        }
    ]);


angular.module('sdchart.buttons', [])
    .directive('addButton', [

        function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {

                    scope.addItem = function(sSource) {
                        if (sSource == 'typeahead' && (typeof scope.selections.item.typeahead == 'object') && scope.selections.item.typeahead != null) {
                            if (scope.DataService.pushPlottableDynamic(scope.selections.item.typeahead) && scope.DataService.isValid()) {
                                // Setting the Loading to true for both charts and tabs
                                scope.DataService.setLoading('chart', 'reload', true);
                                scope.DataService.setLoading('tabs', 'reload', true);
                                // Setting the request to Default
                                scope.ChartDataService.setPeriodRequest(true);
                                // Updating the hash 'status.valid' to trigger watches
                                if (scope.DataService.status.fundAdded == false) {
                                    scope.pushBSC();
                                    scope.setDefaultRequestAndValid();
                                    scope.DataService.status.fundAdded = true;
                                }
                                scope.DataService.status.valid = moment.utc().valueOf();
                                scope.selections.item.typeahead = null;
                            }
                        } else if (sSource == 'select' && scope.selections.item.select != null) {
                            if (scope.DataService.pushPlottableDynamic(JSON.parse(scope.selections.item.select)) && scope.DataService.isValid()) {
                                // Setting the Loading to true for both charts and tabs
                                scope.DataService.setLoading('chart', 'reload', true);
                                scope.DataService.setLoading('tabs', 'reload', true);
                                // Setting the request to Default
                                scope.ChartDataService.setPeriodRequest(true);
                                // Updating the hash 'status.valid' to trigger watches
                                scope.DataService.status.valid = moment.utc().valueOf();
                            }
                        }
                        return false;
                    }
                }
            }
        }
    ]);

angular.module('ui.kurtosys.buttons', [])
    .directive('ngClick', function() {
        return function(scope, element, attrs) {
            KS$(element).click(function(event) {
                event.preventDefault();
                event.stopPropagation();
            });
        }
    });

angular.module('ui.kurtosys.select', [])
    .directive('select', ['$timeout',
        function($timeout) {
            return {
                restrict: 'E',
                link: function(scope, element, attr) {

                    scope.$watch(attr.ngModel, function(newval, oldval) {
                        if (KS$(element).find(':selected').text() != "") {
                            $timeout(function() {
                                KS$(element).prev('.x-displayValue').html(KS$(element).find(':selected').text());
                            }, 50);
                        }
                    })

                }
            }
        }
    ]);

/**
 * Enhanced Select2 Dropmenus
 *
 * @AJAX Mode - When in this mode, your value will be an object (or array of objects) of the data used by Select2
 *     This change is so that you do not have to do an additional query yourself on top of Select2's own query
 * @params [options] {object} The configuration options passed to $.fn.select2(). Refer to the documentation
 */
angular.module('ui.select2', []).value('uiSelect2Config', {}).directive('uiSelect2', ['uiSelect2Config', '$timeout',
    function(uiSelect2Config, $timeout) {
        var options = {};
        if (uiSelect2Config) {
            angular.extend(options, uiSelect2Config);
        }
        return {
            require: 'ngModel',
            priority: 1,
            compile: function(tElm, tAttrs) {
                var watch,
                    repeatOption,
                    repeatAttr,
                    isSelect = tElm.is('select'),
                    isMultiple = angular.isDefined(tAttrs.multiple);

                // Enable watching of the options dataset if in use
                if (tElm.is('select')) {
                    repeatOption = tElm.find('optgroup[ng-repeat], optgroup[data-ng-repeat], option[ng-repeat], option[data-ng-repeat]');

                    if (repeatOption.length) {
                        repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat');
                        watch = jQuery.trim(repeatAttr.split('|')[0]).split(' ').pop();
                    }
                }

                return function(scope, elm, attrs, controller) {
                    // instance-specific options
                    var opts = angular.extend({}, options, scope.$eval(attrs.uiSelect2));

                    /*
        Convert from Select2 view-model to Angular view-model.
        */
                    var convertToAngularModel = function(select2_data) {
                        var model;
                        if (opts.simple_tags) {
                            model = [];
                            angular.forEach(select2_data, function(value, index) {
                                model.push(value.id);
                            });
                        } else {
                            model = select2_data;
                        }
                        return model;
                    };

                    /*
        Convert from Angular view-model to Select2 view-model.
        */
                    var convertToSelect2Model = function(angular_data) {
                        var model = [];
                        if (!angular_data) {
                            return model;
                        }

                        if (opts.simple_tags) {
                            model = [];
                            angular.forEach(
                                angular_data,
                                function(value, index) {
                                    model.push({
                                        'id': value,
                                        'text': value
                                    });
                                });
                        } else {
                            model = angular_data;
                        }
                        return model;
                    };

                    if (isSelect) {
                        // Use <select multiple> instead
                        delete opts.multiple;
                        delete opts.initSelection;
                    } else if (isMultiple) {
                        opts.multiple = true;
                    }

                    if (controller) {
                        // Watch the model for programmatic changes
                        scope.$watch(tAttrs.ngModel, function(current, old) {
                            if (!current) {
                                return;
                            }
                            if (current === old) {
                                return;
                            }
                            controller.$render();
                        }, true);
                        controller.$render = function() {
                            if (isSelect) {
                                elm.select2('val', controller.$viewValue);
                            } else {
                                if (opts.multiple) {
                                    var viewValue = controller.$viewValue;
                                    if (angular.isString(viewValue)) {
                                        viewValue = viewValue.split(',');
                                    }
                                    elm.select2(
                                        'data', convertToSelect2Model(viewValue));
                                } else {
                                    if (angular.isObject(controller.$viewValue)) {
                                        elm.select2('data', controller.$viewValue);
                                    } else if (!controller.$viewValue) {
                                        elm.select2('data', null);
                                    } else {
                                        elm.select2('val', controller.$viewValue);
                                    }
                                }
                            }
                        };

                        // Watch the options dataset for changes
                        if (watch) {
                            scope.$watch(watch, function(newVal, oldVal, scope) {
                                if (angular.equals(newVal, oldVal)) {
                                    return;
                                }
                                // Delayed so that the options have time to be rendered
                                $timeout(function() {
                                    elm.select2('val', controller.$viewValue);
                                    // Refresh angular to remove the superfluous option
                                    elm.trigger('change');
                                    if (newVal && !oldVal && controller.$setPristine) {
                                        controller.$setPristine(true);
                                    }
                                });
                            });
                        }

                        // Update valid and dirty statuses
                        controller.$parsers.push(function(value) {
                            var div = elm.prev();
                            div
                                .toggleClass('ng-invalid', !controller.$valid)
                                .toggleClass('ng-valid', controller.$valid)
                                .toggleClass('ng-invalid-required', !controller.$valid)
                                .toggleClass('ng-valid-required', controller.$valid)
                                .toggleClass('ng-dirty', controller.$dirty)
                                .toggleClass('ng-pristine', controller.$pristine);
                            return value;
                        });

                        if (!isSelect) {
                            // Set the view and model value and update the angular template manually for the ajax/multiple select2.
                            elm.bind("change", function(e) {
                                e.stopImmediatePropagation();

                                if (scope.$$phase || scope.$root.$$phase) {
                                    return;
                                }
                                scope.$apply(function() {
                                    controller.$setViewValue(
                                        convertToAngularModel(elm.select2('data')));
                                });
                            });

                            if (opts.initSelection) {
                                var initSelection = opts.initSelection;
                                opts.initSelection = function(element, callback) {
                                    initSelection(element, function(value) {
                                        var isPristine = controller.$pristine;
                                        controller.$setViewValue(convertToAngularModel(value));
                                        callback(value);
                                        if (isPristine) {
                                            controller.$setPristine();
                                        }
                                        elm.prev().toggleClass('ng-pristine', controller.$pristine);
                                    });
                                };
                            }
                        }
                    }

                    elm.bind("$destroy", function() {
                        elm.select2("destroy");
                    });

                    attrs.$observe('disabled', function(value) {
                        elm.select2('enable', !value);
                    });

                    attrs.$observe('readonly', function(value) {
                        elm.select2('readonly', !!value);
                    });

                    if (attrs.ngMultiple) {
                        scope.$watch(attrs.ngMultiple, function(newVal) {
                            attrs.$set('multiple', !!newVal);
                            elm.select2(opts);
                        });
                    }

                    // Initialize the plugin late so that the injected DOM does not disrupt the template compiler
                    $timeout(function() {
                        elm.select2(opts);

                        // Set initial value - I'm not sure about this but it seems to need to be there
                        elm.select2('data', controller.$modelValue);
                        // important!
                        controller.$render();

                        // Not sure if I should just check for !isSelect OR if I should check for 'tags' key
                        if (!opts.initSelection && !isSelect) {
                            var isPristine = controller.$pristine;
                            controller.$setViewValue(
                                convertToAngularModel(elm.select2('data'))
                            );
                            if (isPristine) {
                                controller.$setPristine();
                            }
                            elm.prev().toggleClass('ng-pristine', controller.$pristine);
                        }
                    });
                };
            }
        };
    }
]);

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])
/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
.factory('typeaheadParser', ['$parse',
    function($parse) {

        //                      00000111000000000000022200000000000000003333333333333330000000000044000
        var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

        return {
            parse: function(input) {

                var match = input.match(TYPEAHEAD_REGEXP);
                if (!match) {
                    throw new Error(
                        'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
                        ' but got "' + input + '".');
                }

                return {
                    itemName: match[3],
                    source: $parse(match[4]),
                    viewMapper: $parse(match[2] || match[1]),
                    modelMapper: $parse(match[1])
                };
            }
        };
    }
])

.directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
    function($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

        var HOT_KEYS = [9, 13, 27, 38, 40];

        return {
            require: 'ngModel',
            link: function(originalScope, element, attrs, modelCtrl) {

                //SUPPORTED ATTRIBUTES (OPTIONS)

                //minimal no of characters that needs to be entered before typeahead kicks-in
                var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

                //minimal wait time after last character typed before typehead kicks-in
                var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

                //should it restrict model values to the ones selected from the popup only?
                var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

                //binding to a variable that indicates if matches are being retrieved asynchronously
                var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

                //a callback executed when a match is selected
                var onSelectCallback = $parse(attrs.typeaheadOnSelect);

                var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

                var appendToBody = attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

                //INTERNAL VARIABLES

                //model setter executed upon match selection
                var $setModelValue = $parse(attrs.ngModel).assign;

                //expressions used by typeahead
                var parserResult = typeaheadParser.parse(attrs.typeahead);

                var hasFocus;

                // WAI-ARIA
                element.attr({
                    'aria-autocomplete': 'list',
                    'aria-expanded': false
                });

                //pop-up element used to display matches
                var popUpEl = angular.element('<div typeahead-popup></div>');
                popUpEl.attr({
                    matches: 'matches',
                    active: 'activeIdx',
                    select: 'select(activeIdx)',
                    query: 'query',
                    position: 'position'
                });
                //custom item template
                if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
                    popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
                }

                //create a child scope for the typeahead directive so we are not polluting original scope
                //with typeahead-specific data (matches, query etc.)
                var scope = originalScope.$new();
                originalScope.$on('$destroy', function() {
                    scope.$destroy();
                });

                var resetMatches = function() {
                    scope.matches = [];
                    scope.activeIdx = -1;
                    element.attr('aria-expanded', false);
                };

                var getMatchesAsync = function(inputValue) {

                    var locals = {
                        $viewValue: inputValue
                    };
                    isLoadingSetter(originalScope, true);
                    $q.when(parserResult.source(originalScope, locals)).then(function(matches) {

                        //it might happen that several async queries were in progress if a user were typing fast
                        //but we are interested only in responses that correspond to the current view value
                        var onCurrentRequest = (inputValue === modelCtrl.$viewValue);
                        if (onCurrentRequest && hasFocus) {
                            if (matches.length > 0) {

                                scope.activeIdx = 0;
                                scope.matches.length = 0;

                                //transform labels
                                for (var i = 0; i < matches.length; i++) {
                                    locals[parserResult.itemName] = matches[i];
                                    scope.matches.push({
                                        label: parserResult.viewMapper(scope, locals),
                                        model: matches[i]
                                    });
                                }

                                scope.query = inputValue;
                                //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                                //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                                //due to other elements being rendered
                                scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                                scope.position.top = scope.position.top + element.prop('offsetHeight');

                                element.attr('aria-expanded', true);
                            } else {
                                resetMatches();
                            }
                        }
                        if (onCurrentRequest) {
                            isLoadingSetter(originalScope, false);
                        }
                    }, function() {
                        resetMatches();
                        isLoadingSetter(originalScope, false);
                    });
                };

                resetMatches();

                //we need to propagate user's query so we can higlight matches
                scope.query = undefined;

                //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later 
                var timeoutPromise;

                //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
                //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
                modelCtrl.$parsers.unshift(function(inputValue) {

                    hasFocus = true;

                    if (inputValue && inputValue.length >= minSearch) {
                        if (waitTime > 0) {
                            if (timeoutPromise) {
                                $timeout.cancel(timeoutPromise); //cancel previous timeout
                            }
                            timeoutPromise = $timeout(function() {
                                getMatchesAsync(inputValue);
                            }, waitTime);
                        } else {
                            getMatchesAsync(inputValue);
                        }
                    } else {
                        isLoadingSetter(originalScope, false);
                        resetMatches();
                    }

                    if (isEditable) {
                        return inputValue;
                    } else {
                        if (!inputValue) {
                            // Reset in case user had typed something previously.
                            modelCtrl.$setValidity('editable', true);
                            return inputValue;
                        } else {
                            modelCtrl.$setValidity('editable', false);
                            return undefined;
                        }
                    }
                });

                modelCtrl.$formatters.push(function(modelValue) {

                    var candidateViewValue, emptyViewValue;
                    var locals = {};

                    if (inputFormatter) {

                        locals['$model'] = modelValue;
                        return inputFormatter(originalScope, locals);

                    } else {

                        //it might happen that we don't have enough info to properly render input value
                        //we need to check for this situation and simply return model value if we can't apply custom formatting
                        locals[parserResult.itemName] = modelValue;
                        candidateViewValue = parserResult.viewMapper(originalScope, locals);
                        locals[parserResult.itemName] = undefined;
                        emptyViewValue = parserResult.viewMapper(originalScope, locals);

                        return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
                    }
                });

                scope.select = function(activeIdx) {
                    //called from within the $digest() cycle
                    var locals = {};
                    var model, item;

                    locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
                    model = parserResult.modelMapper(originalScope, locals);
                    $setModelValue(originalScope, model);
                    modelCtrl.$setValidity('editable', true);

                    onSelectCallback(originalScope, {
                        $item: item,
                        $model: model,
                        $label: parserResult.viewMapper(originalScope, locals)
                    });

                    resetMatches();

                    //return focus to the input element if a mach was selected via a mouse click event
                    // use timeout to avoid $rootScope:inprog error
                    $timeout(function() {
                        element[0].focus();
                    }, 0, false);
                };

                //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
                element.bind('keydown', function(evt) {

                    //typeahead is open and an "interesting" key was pressed
                    if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                        return;
                    }

                    evt.preventDefault();

                    if (evt.which === 40) {
                        scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                        scope.$digest();

                    } else if (evt.which === 38) {
                        scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
                        scope.$digest();

                    } else if (evt.which === 13 || evt.which === 9) {
                        scope.$apply(function() {
                            scope.select(scope.activeIdx);
                        });

                    } else if (evt.which === 27) {
                        evt.stopPropagation();

                        resetMatches();
                        scope.$digest();
                    }
                });

                element.bind('blur', function(evt) {
                    hasFocus = false;
                });

                // Keep reference to click handler to unbind it.
                var dismissClickHandler = function(evt) {
                    if (element[0] !== evt.target) {
                        resetMatches();
                        scope.$digest();
                    }
                };

                $document.bind('click', dismissClickHandler);

                originalScope.$on('$destroy', function() {
                    $document.unbind('click', dismissClickHandler);
                });

                var $popup = $compile(popUpEl)(scope);
                if (appendToBody) {
                    $document.find('body').append($popup);
                } else {
                    element.after($popup);
                }
            }
        };
    }
])

.directive('typeaheadPopup', function() {
    return {
        restrict: 'EA',
        scope: {
            matches: '=',
            query: '=',
            active: '=',
            position: '=',
            select: '&'
        },
        replace: true,
        templateUrl: 'views/sdchart.dynamic.typeahead.aspx',
        link: function(scope, element, attrs) {

            scope.templateUrl = attrs.templateUrl;

            scope.isOpen = function() {
                return scope.matches.length > 0;
            };

            scope.isActive = function(matchIdx) {
                return scope.active == matchIdx;
            };

            scope.selectActive = function(matchIdx) {
                scope.active = matchIdx;
            };

            scope.selectMatch = function(activeIdx) {
                scope.select({
                    activeIdx: activeIdx
                });
            };
        }
    };
})

.directive('typeaheadMatch', ['$http', '$templateCache', '$compile', '$parse',
    function($http, $templateCache, $compile, $parse) {
        return {
            restrict: 'EA',
            scope: {
                index: '=',
                match: '=',
                query: '='
            },
            link: function(scope, element, attrs) {
                var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'views/sdchart.dynamic.typeahead-match.aspx';
                $http.get(tplUrl, {
                    cache: $templateCache
                }).success(function(tplContent) {
                    element.replaceWith($compile(tplContent.trim())(scope));
                });
            }
        };
    }
])

.filter('typeaheadHighlight', function() {

    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    return function(matchItem, query) {
        return query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
    };
});

angular.module('ui.bootstrap.bindHtml', [])

.directive('bindHtmlUnsafe', function() {
    return function(scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
        scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
            element.html(value || '');
        });
    };
});


angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
.factory('$position', ['$document', '$window',
    function($document, $window) {

        function getStyle(el, cssprop) {
            if (el.currentStyle) { //IE
                return el.currentStyle[cssprop];
            } else if ($window.getComputedStyle) {
                return $window.getComputedStyle(el)[cssprop];
            }
            // finally try and get inline style
            return el.style[cssprop];
        }

        /**
         * Checks if a given element is statically positioned
         * @param element - raw DOM element
         */
        function isStaticPositioned(element) {
            return (getStyle(element, 'position') || 'static') === 'static';
        }

        /**
         * returns the closest, non-statically positioned parentOffset of a given element
         * @param element
         */
        var parentOffsetEl = function(element) {
            var docDomEl = $document[0];
            var offsetParent = element.offsetParent || docDomEl;
            while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || docDomEl;
        };

        return {
            /**
             * Provides read-only equivalent of jQuery's position function:
             * http://api.jquery.com/position/
             */
            position: function(element) {
                var elBCR = this.offset(element);
                var offsetParentBCR = {
                    top: 0,
                    left: 0
                };
                var offsetParentEl = parentOffsetEl(element[0]);
                if (offsetParentEl != $document[0]) {
                    offsetParentBCR = this.offset(angular.element(offsetParentEl));
                    offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                    offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
                }

                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop('offsetWidth'),
                    height: boundingClientRect.height || element.prop('offsetHeight'),
                    top: elBCR.top - offsetParentBCR.top,
                    left: elBCR.left - offsetParentBCR.left
                };
            },

            /**
             * Provides read-only equivalent of jQuery's offset function:
             * http://api.jquery.com/offset/
             */
            offset: function(element) {
                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop('offsetWidth'),
                    height: boundingClientRect.height || element.prop('offsetHeight'),
                    top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
                    left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
                };
            },

            /**
             * Provides coordinates for the targetEl in relation to hostEl
             */
            positionElements: function(hostEl, targetEl, positionStr, appendToBody) {

                var positionStrParts = positionStr.split('-');
                var pos0 = positionStrParts[0],
                    pos1 = positionStrParts[1] || 'center';

                var hostElPos,
                    targetElWidth,
                    targetElHeight,
                    targetElPos;

                hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

                targetElWidth = targetEl.prop('offsetWidth');
                targetElHeight = targetEl.prop('offsetHeight');

                var shiftWidth = {
                    center: function() {
                        return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
                    },
                    left: function() {
                        return hostElPos.left;
                    },
                    right: function() {
                        return hostElPos.left + hostElPos.width;
                    }
                };

                var shiftHeight = {
                    center: function() {
                        return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
                    },
                    top: function() {
                        return hostElPos.top;
                    },
                    bottom: function() {
                        return hostElPos.top + hostElPos.height;
                    }
                };

                switch (pos0) {
                    case 'right':
                        targetElPos = {
                            top: shiftHeight[pos1](),
                            left: shiftWidth[pos0]()
                        };
                        break;
                    case 'left':
                        targetElPos = {
                            top: shiftHeight[pos1](),
                            left: hostElPos.left - targetElWidth
                        };
                        break;
                    case 'bottom':
                        targetElPos = {
                            top: shiftHeight[pos0](),
                            left: shiftWidth[pos1]()
                        };
                        break;
                    default:
                        targetElPos = {
                            top: hostElPos.top - targetElHeight,
                            left: shiftWidth[pos1]()
                        };
                        break;
                }

                return targetElPos;
            }
        };
    }
]);


angular.module('ks.datepicker', [])
    .directive('ksDatepicker', ['$compile', '$timeout', 'DatePickerService',
        function($compile, $timeout, DatePickerService) {
            return {
                scope: true,
                restrict: 'A',
                replace: true,
                // template: '<div class="ks__datepicker--daterange"><div class="ks__datepicker__date--from"><div class="ks__datepicker__date--from--label" ng-bind="\'from\' | translate | capitalize"></div><input type="text" class="ks__datepicker__date--from--input" placeholder="{{\'Pick a date\' | translate | capitalize}}" value=""/></div><div class="ks__datepicker__date--divider"></div><div class="ks__datepicker__date--to"><div class="ks__datepicker__date--to--label" ng-bind="\'to\' | translate | capitalize"></div><input type="text" class="ks__datepicker__date--to--input" placeholder="{{\'Pick a date\' | translate | capitalize}}" value=""/></div></div>',
                template: '<div class="ks__datepicker--daterange"><div class="ks__datepicker__date--from"><input type="text" class="ks__datepicker__date--from--input" placeholder="{{\'from\' | translate | capitalize}}" value=""/><i class="fa fa-calendar calendar-from"></i></div><div class="ks__datepicker__date--divider"></div><div class="ks__datepicker__date--to"><input type="text" class="ks__datepicker__date--to--input" placeholder="{{\'to\' | translate | capitalize}}" value=""/><i class="fa fa-calendar calendar-to"></i></div></div>',
                link: function(scope, element, attrs) {

                    DatePickerService[attrs.ksDatepickerModel] = {
                        from: undefined,
                        to: undefined,
                        update: undefined
                    };

                    scope[attrs.ksDatepickerModel] = {
                        from: undefined,
                        to: undefined,
                        update: undefined
                    };

                    var elem = {
                        div: element,
                        from: {
                            div: element.find('.ks__datepicker__date--from'),
                            label: element.find('.ks__datepicker__date--from--label'),
                            input: element.find('.ks__datepicker__date--from--input'),
                            calendar: element.find('.calendar-from')
                        },
                        to: {
                            div: element.find('.ks__datepicker__date--to'),
                            label: element.find('.ks__datepicker__date--to--label'),
                            input: element.find('.ks__datepicker__date--to--input'),
                            calendar: element.find('.calendar-to')
                        },
                        divider: element.find('.ks__datepicker__date--divider')
                    };


                    var datepickerRegional = {};
                    datepickerRegional['en-EN'] = {
                        closeText: 'Done',
                        prevText: 'Prev',
                        nextText: 'Next',
                        currentText: 'Today',
                        monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'
                        ],
                        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ],
                        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                        weekHeader: 'Wk',
                        dateFormat: 'dd/mm/yy',
                        firstDay: 1,
                        isRTL: false,
                        showMonthAfterYear: false,
                        yearSuffix: ''
                    };

                    datepickerRegional['es-ES'] = {
                        closeText: 'Cerrar',
                        prevText: 'Ant',
                        nextText: 'Sig',
                        currentText: 'Hoy',
                        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
                        ],
                        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                            'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
                        ],
                        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
                        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
                        weekHeader: 'Sm',
                        dateFormat: 'dd/mm/yy',
                        firstDay: 1,
                        isRTL: false,
                        showMonthAfterYear: false,
                        yearSuffix: ''
                    };

                    datepickerRegional['it-IT'] = {
                        closeText: 'Chiudi',
                        prevText: 'Prec',
                        nextText: 'Succ',
                        currentText: 'Oggi',
                        monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                            'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
                        ],
                        monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
                            'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'
                        ],
                        dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
                        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
                        dayNamesMin: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
                        weekHeader: 'Sm',
                        dateFormat: 'dd/mm/yy',
                        firstDay: 1,
                        isRTL: false,
                        showMonthAfterYear: false,
                        yearSuffix: ''
                    };

                    datepickerRegional['fr-FR'] = {
                        closeText: 'Fermer',
                        prevText: 'Préc',
                        nextText: 'Suiv',
                        currentText: 'Aujourd\'hui',
                        monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
                            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
                        ],
                        monthNamesShort: ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin',
                            'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'
                        ],
                        dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
                        dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
                        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        weekHeader: 'Sem.',
                        dateFormat: 'dd/mm/yy',
                        firstDay: 1,
                        isRTL: false,
                        showMonthAfterYear: false,
                        yearSuffix: ''
                    };

                    datepickerRegional['de-DE'] = {
                        closeText: 'Schließen',
                        prevText: 'Zurück',
                        nextText: 'Vor&#x3E;',
                        currentText: 'Heute',
                        monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
                        ],
                        monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
                        ],
                        dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                        dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                        dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                        weekHeader: 'KW',
                        dateFormat: 'dd/mm/yy',
                        firstDay: 1,
                        isRTL: false,
                        showMonthAfterYear: false,
                        yearSuffix: ''
                    };


                    attrs.$observe('minDate', function(value, oldValue) {
                        if (value != "" && value != "Invalid date") {

                            var sFromYearRange = "-" + (moment().diff(moment(attrs.minDate, 'YYYY-MM-DD'), 'year') + 1);
                            sFromYearRange += ":-" + moment().diff(moment().subtract('day', attrs.minDaterange), 'year');

                            $(elem.from.input).datepicker('destroy');
                            $(elem.from.input).datepicker({
                                dateFormat: "dd-mm-yyyy",
                                minDate: moment(attrs.minDate, '"YYYY-MM-DD').toDate(),
                                maxDate: -attrs.minDaterange,
                                changeMonth: true,
                                changeYear: true,
                                yearRange: sFromYearRange,
                                beforeShowDay: $.datepicker.noWeekends,
                                onClose: function(date) {
                                    $(this).datepicker("widget").removeClass("ks-datepicker");
                                },
                                onSelect: function(date) {
                                    var _date = moment(date, 'DD-MM-YYYY');
                                    scope.$apply(function() {
                                        scope[attrs.ksDatepickerModel].from = _date;
                                    });
                                    $(elem.from.input).val(_date.format('DD/MM/YYYY'));
                                    $(elem.from.input).blur();
                                    $(elem.from.input).datepicker("hide");
                                },
                                beforeShow: function() {
                                    $(this).datepicker("widget").addClass("ks-datepicker");
                                }
                            });
                            $(elem.from.input).datepicker('option', datepickerRegional[attrs.lang]);

                            var sToYearRange = "-" + (moment().diff(moment(attrs.minDate, 'YYYY-MM-DD').add('day', attrs.minDaterange), 'year') + 1);
                            sToYearRange += ":-0";

                            $(elem.to.input).datepicker('destroy');
                            $(elem.to.input).datepicker({
                                dateFormat: "dd-mm-yyyy",
                                minDate: moment(attrs.minDate, '"YYYY-MM-DD').add('day', attrs.minDaterange).toDate(),
                                maxDate: -1,
                                changeMonth: true,
                                changeYear: true,
                                yearRange: sToYearRange,
                                beforeShowDay: $.datepicker.noWeekends,
                                onClose: function(date) {
                                    $(this).datepicker("widget").removeClass("ks-datepicker");
                                },
                                onSelect: function(date) {
                                    var _date = moment(date, 'DD-MM-YYYY');
                                    scope.$apply(function() {
                                        scope[attrs.ksDatepickerModel].to = _date;
                                    });
                                    $(elem.to.input).val(_date.format('DD/MM/YYYY'));
                                    $(elem.to.input).blur();
                                    $(elem.to.input).datepicker("hide");
                                },
                                beforeShow: function() {
                                    $(this).datepicker("widget").addClass("ks-datepicker");
                                }
                            });

                            $(elem.to.input).datepicker('option', datepickerRegional[attrs.lang]);

                            $(elem.from.calendar).click(function(event) {
                                $(elem.from.input).datepicker("show");
                            });

                            $(elem.to.calendar).click(function(event) {
                                $(elem.to.input).datepicker("show");
                            });

                        }
                    });

                    attrs.$observe('startDate', function(value, oldValue) {
                        if (value != "" && value != "Invalid date") {
                            $timeout(function() {
                                $(elem.to.input).datepicker("option", "minDate", moment(value, 'DD/MM/YYYY').add('day', attrs.minDaterange).toDate());
                                $(elem.from.input).datepicker("option", "minDate", moment(attrs.minDate, 'YYYY-MM-DD').toDate());
                                $(elem.to.input).val(attrs.endDate);
                                $(elem.from.input).val(value);
                            }, 350)
                        }
                    });

                    attrs.$observe('endDate', function(value, oldValue) {
                        if (value != "" && value != "Invalid date") {
                            $timeout(function() {
                                $(elem.to.input).val(value);
                                $(elem.from.input).val(attrs.startDate);
                            }, 350)
                        }
                    });

                    scope.$watch(attrs.ksDatepickerModel + '.from', function(value, oldValue) {
                        if (value != undefined) {
                            // FROM Date has been selected
                            elem.from.div.addClass("selected");
                            elem.divider.addClass("left");
                            // Setting the min date for TO Date
                            $(elem.to.input).datepicker("option", "minDate", moment(scope[attrs.ksDatepickerModel].from).add('day', attrs.minDaterange).toDate());

                            // check if the "to date" has been selected already
                            if (scope[attrs.ksDatepickerModel].to != undefined) {
                                // If so, updates the DataPickerService variable
                                DatePickerService[attrs.ksDatepickerModel] = {
                                    from: scope[attrs.ksDatepickerModel].from,
                                    to: scope[attrs.ksDatepickerModel].to,
                                    update: moment.utc().valueOf()
                                };
                                debug = true;
                            } else if ($(elem.to.input).val() != "") {
                                // If so, updates the DataPickerService variable
                                scope[attrs.ksDatepickerModel].to = moment($(elem.to.input).val(), 'DD/MM/YYYY')
                                DatePickerService[attrs.ksDatepickerModel] = {
                                    from: scope[attrs.ksDatepickerModel].from,
                                    to: scope[attrs.ksDatepickerModel].to,
                                    update: moment.utc().valueOf()
                                };
                            }

                        }
                    });

                    scope.$watch(attrs.ksDatepickerModel + '.to', function(value, oldValue) {
                        if (value != undefined) {
                            // TO Date has been selected
                            elem.to.div.addClass("selected");
                            elem.divider.addClass("right");
                            var maxFromDate = moment().diff(scope[attrs.ksDatepickerModel].to, 'day') + parseFloat(attrs.minDaterange);
                            // Setting the max date for FROM Date
                            $(elem.from.input).datepicker("option", "maxDate", -maxFromDate);


                            // check if the "from date" has been selected already
                            if (scope[attrs.ksDatepickerModel].from != undefined) {
                                // If so, updates the DataPickerService variable
                                DatePickerService[attrs.ksDatepickerModel] = {
                                    from: scope[attrs.ksDatepickerModel].from,
                                    to: scope[attrs.ksDatepickerModel].to,
                                    update: moment.utc().valueOf()
                                };
                                debug = true;
                            } else if ($(elem.from.input).val() != "") {
                                // If so, updates the DataPickerService variable
                                scope[attrs.ksDatepickerModel].from = moment($(elem.from.input).val(), 'DD/MM/YYYY');
                                DatePickerService[attrs.ksDatepickerModel] = {
                                    from: scope[attrs.ksDatepickerModel].from,
                                    to: scope[attrs.ksDatepickerModel].to,
                                    update: moment.utc().valueOf()
                                };
                            }
                        } else {

                        }

                    });

                }
            };
        }
    ]);


angular.module('ks.flashingmessage', [])
    .directive('ksFlashingMessage', ['$timeout', 'MessageHandler', 'DataService',
        function($timeout, MessageHandler, DataService) {
            return {
                scope: {},
                restrict: 'A',
                replace: true,
                template: '<div style="display:none;"><p ng-repeat="error in message">{{error.message}}</p></div>',
                controller: function($scope, DataService, MessageHandler) {
                    $scope.DataService = DataService;
                    $scope.$watch('DataService.isLoading()', function(value, oldValue) {
                        if (value == false) {
                            MessageHandler.updateStatus();
                        }
                    });
                },
                link: function(scope, element, attrs) {

                    scope.MessagePool = [];
                    scope.timeout = null;
                    scope.timeout_ = null;

                    attrs.$observe('status', function(value, oldValue) {
                        if (value != '' && value != oldValue) {
                            if (scope.message = MessageHandler.getMessage()) {
                                scope.timeout = $timeout(function() {
                                    element.fadeIn();
                                    scope.timeout_ = $timeout(function() {
                                        element.fadeOut();
                                        scope.visible = false;
                                    }, 3500);
                                }, 250);
                            }
                        }
                    });
                }
            };
        }
    ]);

angular.module('sdchart.options.widget', [])
    .directive('ksWidgetSdOptions', [

        function() {

            return {
                restrict: 'C',
                link: function(scope, element, attr) {
                    $('body').addClass('ks-sdchart-options-page');
                }
            }

        }
    ]);

angular.module('ngEnter', [])
    .directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

angular.module('sdchart.entrycharge.widget', [])
    .directive('ksWidgetSdEntrycharge', ['$rootScope', '$translate', '$timeout',
        function($rootScope, $translate, $timeout) {

            $rootScope.config = new SDCHART_ENTRYCHARGE_CONFIG();

            return {
                restrict: 'C',
                template: $rootScope.config.Template.Main,
                replace: true,
                link: function(scope, element, attr) {

                    $rootScope.config.Params.Country = '';
                    $rootScope.config.Params.Website = '';
                    $rootScope.config.Params.Language = '';
                    $rootScope.config.Params.Fund = '';

                    // override default config with values from widget config
                    if (attr.country != undefined && attr.country != '') {
                        $rootScope.config.Params.Country = attr.country;
                    }
                    if (attr.website != undefined && attr.website != '') {
                        $rootScope.config.Params.Website = attr.website;
                    }
                    if (attr.language != undefined && attr.language != '') {
                        $rootScope.config.Params.Language = attr.language;
                    }
                    if (attr.isin != undefined && attr.isin != '') {
                        $rootScope.config.Params.Fund = attr.isin;
                    }

                    // Setting the language into the translateProvider
                    // $translate.uses($rootScope.config.Params.Language);
                    // Setting the language into momentjs and numeraljs
                    $timeout(function() {
                        moment.lang($rootScope.config.Params.Language)
                    });
                    numeral.language($rootScope.config.Params.Language);
                }
            }
        }
    ]);

