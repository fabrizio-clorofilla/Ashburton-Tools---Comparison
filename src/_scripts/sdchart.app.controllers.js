/**************************************************************************** 
Static&Dynamic Charting Widgets
App Controllers
*****************************************************************************/

angular.module('SDCHART').controller('MainController', ['$scope', '$rootScope', '$http', '$filter', 'DataService', 'ChartDataService', 'ErrorHandler',
    function($scope, $rootScope, $http, $filter, DataService, ChartDataService, ErrorHandler) {

        $scope.pushBSC = function() {
            DataService.pushPlottable($rootScope.config.Params.Benchmark, 'benchmark');
            DataService.pushPlottable($rootScope.config.Params.Sector, 'sector');
            DataService.pushPlottable($rootScope.config.Params.Category, 'sector');
        }

        $scope.setDefaultRequestAndValid = function() {
            if (DataService.isValid()) {
                // Setting the request to Default
                ChartDataService.setPeriodRequest(true);
                // Updating the hash 'status.valid' to trigger watches
                DataService.status.valid = moment.utc().valueOf();
            } else {}
        }

        $scope.DataService = DataService;
        $scope.ChartDataService = ChartDataService;
        $scope.ErrorHandler = ErrorHandler;

        $scope.isError = ErrorHandler.isError;
        $scope.getError = ErrorHandler.getError;

        $scope.isLoading = DataService.isLoading;

        DataService.colorConfig();
        DataService.tabsConfig();

        DataService.lang = $rootScope.config.Params.Language;

        if ($rootScope.config.Params.Fund.length == 0) {
            DataService.status.fundAdded = false;
        }
        // else if(){

        // }
        else {
            // PUSHING FUNDS/BENCHMARK/SECTOR/CATEGORY INTO THE PLOTTABLES OBJECT
            DataService.pushPlottable($rootScope.config.Params.Fund, 'fund');
            $scope.pushBSC();

            DataService.status.init = moment.utc().valueOf();

            var fundsList = DataService.buildFundListRequest();
            if (fundsList) {
                // API CALL TO RETRIEVE LAUNCH DATES FOR FUNDS
                DataService.API_getFundsDetails(fundsList).then(function(res) {
                    var oFundsDetails = DataService.parseFundsDetails(res);
                    for (item_ in oFundsDetails) {
                        DataService.updatePlottables(oFundsDetails[item_]);
                    }
                    // IF FUND IS OLDER THAN 1 YEAR THE WIDGET STARTS CALLING APIs FOR CHART AND TABLES
                    $scope.setDefaultRequestAndValid();

                });
            } else {
                ErrorHandler.setError('noFundsAdded');
                // HIDE EVERYTHING BUT THE FUND AUTOCOMPLETE FIELD TO ADD A FUND
            }
        }
    }
]);

angular.module('SDCHART').controller('SearchController', ['$scope', '$rootScope', '$http', '$filter', '$timeout', 'DataService', 'SearchBarDataService', 'ErrorHandler',
    function($scope, $rootScope, $http, $filter, $timeout, DataService, SearchBarDataService, ErrorHandler) {

        // TO DO
        $scope.searchBarInit = function(params) {
            SearchBarDataService.API_getInitList({
                clientTypeID: $rootScope.config.Params.Website,
                countryID: $rootScope.config.Params.Country,
                languageID: $rootScope.config.Params.Language
            }).then(function(res) {
                if (KS$.isArray(res.Tables[0].Rows)) {

                    $scope.results = SearchBarDataService.parseResults(res);
                    DataService.setLoading('fundlist', 'init', false);

                    // Iniziatilating the dropdown with "Morningstar Category" selected by default
                    if ($scope.results.elements.length > 0) {
                        $timeout(function() {
                            $scope.selections.cat = $scope.results.elements[0].value;
                            for (var i = 0; i < $scope.results.elements.length; i++) {
                                $scope.catArray.push($scope.results.elements[i].value);
                            }
                            $scope.searchBarPlaceholder = $filter('capitalize')($filter('translate')('search', $rootScope.config.Params.Language)) + ' ' + $filter('translate')('for', $rootScope.config.Params.Language) + ' ' + $filter('capitalize')($filter('translate')('fund', $rootScope.config.Params.Language)) + (($scope.catArray.indexOf('B') != -1) ? ', ' + $filter('capitalize')($filter('translate')('index', $rootScope.config.Params.Language)) : '') + (($scope.catArray.indexOf('C') != -1 || $scope.catArray.indexOf('I') != -1 || $scope.catArray.indexOf('S') != -1 || $scope.catArray.indexOf('A') != -1) ? ', ' + $filter('capitalize')($filter('translate')('category', $rootScope.config.Params.Language)) : '') + ', ' + $filter('translate')('ISIN', $rootScope.config.Params.Language);
                        }, 400)
                    }
                } else {
                    ErrorHandler.setError('SearchInitFailed');
                }
            });
        }

        $scope.filterInitList = function() {
            return function(item) {
                if ($scope.catArray.indexOf(item.Type) != -1) {
                    return item;
                }
            }
        }

        $scope.DataService = DataService;
        $scope.SearchBarDataService = SearchBarDataService;

        $scope.noFundAdded = DataService.noFundAdded;

        $scope.results = {
            typeahead: null,
            elements: null
        };
        $scope.selections = {
            item: {
                select: null,
                typeahead: null
            }
        };

        $scope.catArray = ['F'];

        $scope.searchBarInit();

        $scope.searchBarPlaceholder = $filter('capitalize')($filter('translate')('search', $rootScope.config.Params.Language)) + ' ' + $filter('translate')('for', $rootScope.config.Params.Language) + ' ' + $filter('capitalize')($filter('translate')('fund', $rootScope.config.Params.Language)) + ', ' + $filter('translate')('ISIN', $rootScope.config.Params.Language);

        $scope.$watch('selections.cat', function(value, oldValue) {
            //todo check old/new values
            if (value != null && value != oldValue) {
                $scope.selections.item.select = null;
            }
        });

    }
]);

angular.module('SDCHART').controller('ChartController', ['$scope', '$http', '$timeout', '$rootScope', '$filter', 'DataService', 'ChartDataService', 'DatePickerService', 'ErrorHandler', 'MessageHandler',
    function($scope, $http, $timeout, $rootScope, $filter, DataService, ChartDataService, DatePickerService, ErrorHandler, MessageHandler) {

        $scope.DataService = DataService;
        $scope.DatePickerService = DatePickerService;
        $scope.MessageHandler = MessageHandler;
        $scope.isUpdated = DataService.isUpdated();
        $scope.isLoading = DataService.isLoading;

        $scope.PeriodSelector = {
            Controller: ChartDataService.createPeriodSelectorController(),
            Data: null,
            DatePicker: null
        };

        $scope.chart = {};

        $scope.$watch('DataService.status.valid', function(value, oldValue) {
            //todo check old/new values
            if (value != false && value != oldValue) {

                $scope.PeriodSelector.Data = $scope.PeriodSelector.Controller.getPeriodToPlot(ChartDataService.getPeriodRequest())
                $scope.DataService.PeriodRequested = $scope.PeriodSelector.Data.plot;
                for (var i = 0; i < $scope.PeriodSelector.Data.plot.message.length; i++) {
                    $scope.MessageHandler.pushMessage($filter('translate')($scope.PeriodSelector.Data.plot.message[i], $rootScope.config.Params.Language));
                };
                // $scope.MessageHandler.pushMessage($scope.PeriodSelector.Data.plot.message);

                ChartDataService.API_getChartData(DataService.buildLineChartRequest($scope.PeriodSelector.Data), $rootScope.config.Params.PerfType).then(function(res) {
                    //$scope.chartToolBar = 
                    $scope.chart = {};
                    $scope.chart = ChartDataService.getSerieses(KSCHART.getSerieses(res), true);

                    // ADD HERE MESSAGES PUSHING IF BENCHMARK/SECTOR ARE DROPPED OFF

                    DataService.status.chart = moment.utc().valueOf();

                });
            }
        });

        $scope.$watch('DatePickerService.DatePicker.update', function(value, oldValue) {
            //todo check old/new values
            if (value != undefined) {

                $scope.PeriodSelector.DatePicker = DatePickerService.DatePicker;
                ChartDataService.setPeriodRequest(false, 'DatePicker', $scope.PeriodSelector.DatePicker.from, $scope.PeriodSelector.DatePicker.to);
                DataService.status.valid = moment.utc().valueOf();
                DataService.setLoading('chart', 'reload', true);

            }
        });

        $scope.$watch('DataService.status.toggle', function(value, oldValue) {
            //todo check old/new values
            if (value != "" && value != false && value != oldValue) {

                $scope.plotUpdated = value;

            }
        });

        $scope.printScreen = function(){
            window.print();
        }
    }
]);

angular.module('SDCHART').controller('TabsController', ['$scope', '$http', 'DataService', 'TabsDataService', 'ChartDataService', 'ErrorHandler',
    function($scope, $http, DataService, TabsDataService, ChartDataService, ErrorHandler) {

        $scope.DataService = DataService;
        $scope.TabsDataService = TabsDataService;
        $scope.isUpdated = DataService.isUpdated();
        $scope.isLoading = DataService.isLoading;

        $scope.tabs = [];

        $scope.compile = {
            ytoy: false,
            calyr: false,
            cum: false,
            risk: false
        };

        $scope.timedOutFunction = null;

        $scope.$watch('DataService.status.valid', function(value, oldValue) {
            //todo check old/new values
            if (value != false && value != oldValue) {
                TabsDataService.API_getTabsData(DataService.buildPerfTabsRequest()).then(function(res) {
                    $scope.resetCompileStatus();
                    $scope.tabs = TabsDataService.getTabs(res);
                    DataService.setLoading('tabs', 'init', false);
                    DataService.setLoading('tabs', 'reload', false);

                });
            }
        });

        $scope.getTabIndex = function(sType) {
            for (var i = 0; i < $scope.tabs.length; i++) {
                if (sType == $scope.tabs[i].type) {
                    return $scope.tabs[i];
                    break;
                }
            }
        }

        $scope.applyBackground = function(type, color) {
            if (type == 'fund') {
                return {
                    'background-color': color
                };
            }
        }

        $scope.isFund = function(type) {
            if (type == 'fund') {
                return true;
            }
        }

        $scope.isInitFund = function(type, index) {
            if (type == 'fund' && index == '0') {
                return true;
            }
        }

        $scope.resetCompileStatus = function() {
            for (item_ in $scope.compile) {
                $scope.compile[item_] = false;
            }
        }

    }
]);

angular.module('SDCHART').controller('ConfigGeneratorController', ['$scope', '$rootScope', 'OptionsPageService',
    function($scope, $rootScope, OptionsPageService) {

        $scope.OptionsPageService = OptionsPageService;

        $rootScope.config = new SDCHART_STATIC_CONFIG();

        $scope.isLoading = true;

        $scope.funds = {
            list: {},
            dropdown: null
        };

        $scope.div = {
            static: "Select a Fund to generate the code to embed the widget",
            dynamic: "Select a Fund to generate the code to embed the widget",
            dynamicNoFund: "Select Client Type, Country and Language to generate the code to embed the widget",
            entryCharge: "Select a Fund to generate the code to embed the widget"
        };

        $scope.selections = {
            fund: '',
            country: '',
            website: '',
            language: ''
        };

        $scope.selections.static = {
            perftype: 'net',
            language: 1,
            country: 232,
            hidetab: 'cum,risk'
        };

        $scope.selections.dynamic = {
            perftype: 'net',
            language: '',
            country: '',
            hidetab: ['', '', '', ''],
            hideelement: ['', '']
        };

        $scope.lookup = {
            //Performance Type
            'gross': 1,
            'net': 18
            //Country
        }

        $scope.options = {
            clienttype: null,
            country: null,
            language: null,
            fund: null
        }

        OptionsPageService.API_getOptionsClientType().then(function(res) {
            $scope.options.clientType = res.Tables[0].Rows;
            $scope.isLoading = false;
        });

        $scope.$watch('selections.clienttype', function(data, oldData) {
            //todo check old/new values
            if (data != "" && data != oldData) {
                $scope.isLoading = true;
                $scope.resetDivs();
                $scope.selections.country = null;
                $scope.selections.language = null;
                $scope.selections.fund = null;
                $scope.options.country = null;
                $scope.options.language = null;
                $scope.funds.dropdown = [];

                OptionsPageService.API_getOptionsCountry({
                    clientTypeID: $scope.selections.clienttype
                }).then(function(res) {
                    $scope.options.country = res.Tables[0].Rows;
                    $scope.isLoading = false;
                });
            }
        });

        $scope.$watch('selections.country', function(data, oldData) {
            //todo check old/new values
            if (data != "" && data != oldData) {
                $scope.isLoading = true;
                $scope.resetDivs();
                $scope.selections.language = null;
                $scope.selections.fund = null;
                $scope.options.language = null;
                $scope.funds.dropdown = [];

                OptionsPageService.API_getOptionsLanguage({
                    clientTypeID: $scope.selections.clienttype,
                    countryID: $scope.selections.country
                }).then(function(res) {
                    $scope.options.language = res.Tables[0].Rows;
                    $scope.isLoading = false;
                });
            }
        });

        $scope.$watch('selections.language', function(data, oldData) {
            //todo check old/new values
            if (data != "" && data != oldData) {
                $scope.isLoading = true;
                $scope.resetDivs();
                $scope.selections.fund = null;
                $scope.funds.dropdown = [];
                if(data != null) $scope.updateDiv('dynamicNoFund');

                OptionsPageService.API_getOptionsFund({
                    clientTypeID: $scope.selections.clienttype,
                    countryID: $scope.selections.country,
                    languageID: $scope.selections.language
                }).then(function(res) {

                    var aFunds = res.Tables[0].Rows;
                    for (var i = 0; i < aFunds.length; i++) {
                        $scope.funds.list[aFunds[i].ISIN] = aFunds[i];

                        var elm = {};
                        elm.v = aFunds[i].ISIN;
                        elm.l = aFunds[i].FundName + ' (' + aFunds[i].ISIN + ')';
                        if (elm.v != '') $scope.funds.dropdown.push(elm);
                    }
                    $scope.isLoading = false;

                });

                (data == 'de-DE') ? $('.germany-only').show() : $('.germany-only').hide();

            }
        });

        $scope.$watch('selections.fund', function(data, oldData) {
            //todo check old/new values
            if (data != "" && data != oldData && data != null) {
                $scope.selections.dynamic.perftype = $scope.funds.list[$scope.selections.fund].PerfType;
                $scope.selections.static.perftype = $scope.funds.list[$scope.selections.fund].PerfType;
                $scope.updateDiv('static');
                $scope.updateDiv('dynamic');
                $scope.updateDiv('entryCharge');
            }

        });

        $scope.$watchCollection('selections.static', function(data, oldData) {
            //todo check old/new values
            if (data != "" && data != oldData) {
                if ($scope.selections.fund != '' && $scope.selections.fund != null) $scope.updateDiv('static');
            }
        });

        $scope.$watchCollection('selections.dynamic', function(data, oldData) {
            //todo check old/new values
            if (data != "" && data != oldData) {
                if ($scope.selections.fund != '' && $scope.selections.fund != null) $scope.updateDiv('dynamic');
                if ($scope.selections.language != '' && $scope.selections.language != null) $scope.updateDiv('dynamicNoFund');
            }
        });

        $scope.$watchCollection('selections.dynamic.hidetab', function(data, oldData) {
            //todo check old/new values
            if (data != "" && data != oldData) {
                if ($scope.selections.fund != '' && $scope.selections.fund != null)  $scope.updateDiv('dynamic');
                if ($scope.selections.language != '' && $scope.selections.language != null) $scope.updateDiv('dynamicNoFund');

            }
        });

        $scope.$watchCollection('selections.dynamic.hideelement', function(data, oldData) {
            //todo check old/new values
            if (data != "" && data != oldData) {
                if ($scope.selections.fund != '' && $scope.selections.fund != null) $scope.updateDiv('dynamic');
            }
        });

        $scope.stage = function(version) {
            if ($scope.selections.fund != "") {
                setTimeout(function() {
                    if (version == 'static') {
                        window.open($rootScope.config.SITE_URL + '/fundtools/options/sdchart.static.staging.aspx?website=' + $scope.selections.clienttype + '&country=' + $scope.selections.country + '&language=' + $scope.selections.language + '&isin=' + $scope.selections.fund + '&benchmark=' + $scope.funds.list[$scope.selections.fund].BenchmarkId + '&sector=' + $scope.funds.list[$scope.selections.fund].SectorId + '&category=' + $scope.funds.list[$scope.selections.fund].CategoryId + '&hidetab=cum,risk&perftype=' + $scope.selections.static.perftype);
                    }
                    if (version == 'dynamic') {
                        var hideelement = {
                            array: [],
                            list: ''
                        };
                        var hidetab = {
                            array: [],
                            list: ''
                        };
                        for (var i = 0; i < $scope.selections.dynamic.hideelement.length; i++) {
                            if ($scope.selections.dynamic.hideelement[i] != '') {
                                hideelement.array.push($scope.selections.dynamic.hideelement[i])
                            }
                        }
                        for (var i = 0; i < $scope.selections.dynamic.hidetab.length; i++) {
                            if ($scope.selections.dynamic.hidetab[i] != '') {
                                hidetab.array.push($scope.selections.dynamic.hidetab[i])
                            }
                        }
                        if (hideelement.array.length > 0) {
                            hideelement.list = hideelement.array.join(',');
                        }
                        if (hidetab.array.length > 0) {
                            hidetab.list = hidetab.array.join(',');
                        }
                        window.open($rootScope.config.SITE_URL + '/fundtools/options/sdchart.staging.aspx?website=' + $scope.selections.clienttype + '&country=' + $scope.selections.country + '&language=' + $scope.selections.language + '&isin=' + $scope.selections.fund + '&benchmark=' + $scope.funds.list[$scope.selections.fund].BenchmarkId + '&sector=' + $scope.funds.list[$scope.selections.fund].SectorId + '&category=' + $scope.funds.list[$scope.selections.fund].CategoryId + '&hidetab=' + hidetab.list + '&perftype=' + $scope.selections.dynamic.perftype + '&hideelement=' + hideelement.list);
                    }
                    if (version == 'entryCharge') {
                        window.open($rootScope.config.SITE_URL + '/fundtools/options/sdchart.entrycharge.staging.aspx?website=' + $scope.selections.clienttype + '&country=' + $scope.selections.country + '&language=' + $scope.selections.language + '&isin=' + $scope.selections.fund);
                    }
                });
            }
            if ($scope.selections.language != "") {
                setTimeout(function() {
                    if (version == 'dynamicNoFund') {
                        var hidetab = {
                            array: [],
                            list: ''
                        };
                        for (var i = 0; i < $scope.selections.dynamic.hidetab.length; i++) {
                            if ($scope.selections.dynamic.hidetab[i] != '') {
                                hidetab.array.push($scope.selections.dynamic.hidetab[i])
                            }
                        }
                        if (hidetab.array.length > 0) {
                            hidetab.list = hidetab.array.join(',');
                        }
                        window.open($rootScope.config.SITE_URL + '/options/sdchart.dynamic.staging.aspx?website=' + $scope.selections.clienttype + '&country=' + $scope.selections.country + '&language=' + $scope.selections.language + '&isin=&benchmark=&sector=&category=&hidetab=' + hidetab.list + '&perftype=' + $scope.selections.dynamic.perftype + '&hideelement=benchmark,sector');
                    }
                });
            }
        }

        $scope.resetDivs = function() {
            $scope.div = {
                static: "Select a Fund to generate the code to embed the widget",
                dynamic: "Select a Fund to generate the code to embed the widget",
                dynamicNoFund: "Select Client Type, Country and Language to generate the code to embed the widget",
                entryCharge: "Select a Fund to generate the code to embed the widget"
            };
        }

        $scope.updateDiv = function(version) {
            if (version == 'static' && $scope.selections.fund != '') {
                $scope.selections.benchmark = $scope.funds.list[$scope.selections.fund].BenchmarkId;
                $scope.selections.sector = $scope.funds.list[$scope.selections.fund].SectorId;
                $scope.selections.category = $scope.funds.list[$scope.selections.fund].CategoryId;
                $scope.div.static = '<!--STATIC CHART WIDGET START-->\n<script src="__DEPLOYMENTURL__/_scripts/sdchart.widget.js"></script>\n<div class="ks-widget-sd ks-widget-sd-static" country="' + $scope.selections.country + '" website="' + $scope.selections.clienttype + '" language="' + $scope.selections.language + '" isin="' + $scope.selections.fund + '" benchmark="' + $scope.selections.benchmark + '" sector="' + $scope.selections.sector + '" category="' + $scope.selections.category + '" hidetab="cum,risk" perftype="' + $scope.selections.static.perftype + '" app="{}"></div>\n<!--STATIC CHART WIDGET END-->';
            }
            if (version == 'dynamic') {
                var hideelement = {
                    array: [],
                    list: ''
                };
                var hidetab = {
                    array: [],
                    list: ''
                };
                for (var i = 0; i < $scope.selections.dynamic.hideelement.length; i++) {
                    if ($scope.selections.dynamic.hideelement[i] != '') {
                        hideelement.array.push($scope.selections.dynamic.hideelement[i])
                    }
                }
                for (var i = 0; i < $scope.selections.dynamic.hidetab.length; i++) {
                    if ($scope.selections.dynamic.hidetab[i] != '') {
                        hidetab.array.push($scope.selections.dynamic.hidetab[i])
                    }
                }
                if (hideelement.array.length > 0) {
                    hideelement.list = hideelement.array.join(',');
                }
                if (hidetab.array.length > 0) {
                    hidetab.list = hidetab.array.join(',');
                }
                $scope.selections.benchmark = $scope.funds.list[$scope.selections.fund].BenchmarkId;
                $scope.selections.sector = $scope.funds.list[$scope.selections.fund].SectorId;
                $scope.selections.category = $scope.funds.list[$scope.selections.fund].CategoryId;
                $scope.div.dynamic = '<!--DYNAMIC CHART WIDGET START-->\n<script src="__DEPLOYMENTURL__/_scripts/sdchart.widget.js"></script>\n<div class="ks-widget-sd ks-widget-sd-dynamic" country="' + $scope.selections.country + '" website="' + $scope.selections.clienttype + '" language="' + $scope.selections.language + '" isin="' + $scope.selections.fund + '" benchmark="' + $scope.selections.benchmark + '" sector="' + $scope.selections.sector + '" category="' + $scope.selections.category + '" hidetab="' + hidetab.list + '" perftype="' + $scope.selections.dynamic.perftype + '" hideelement="' + hideelement.list + '" app="{}"></div>\n<!--DYNAMIC CHART WIDGET END-->';
            }
            if (version == 'dynamicNoFund') {
                var hidetab = {
                    array: [],
                    list: ''
                };
                for (var i = 0; i < $scope.selections.dynamic.hidetab.length; i++) {
                    if ($scope.selections.dynamic.hidetab[i] != '') {
                        hidetab.array.push($scope.selections.dynamic.hidetab[i])
                    }
                }
                if (hidetab.array.length > 0) {
                    hidetab.list = hidetab.array.join(',');
                }
                $scope.div.dynamicNoFund = '<!--FUND COMPARISON TOOL WIDGET START-->\n<script src="__DEPLOYMENTURL__/_scripts/sdchart.widget.js"></script>\n<div class="ks-widget-sd ks-widget-sd-dynamic" country="' + $scope.selections.country + '" website="' + $scope.selections.clienttype + '" language="' + $scope.selections.language + '" isin="" benchmark="" sector="" category="" hidetab="' + hidetab.list + '" perftype="' + $scope.selections.dynamic.perftype + '" hideelement="benchmark,sector" app="{}"></div>\n<!--FUND COMPARISON TOOL WIDGET END-->';
            }
            if (version == 'entryCharge') {
                $scope.div.entryCharge = '<!--ENTRY CHARGE CHART WIDGET START-->\n<script src="__DEPLOYMENTURL__/_scripts/sdchart.widget.js"></script>\n<div class="ks-widget-sd ks-widget-sd-entrycharge" country="' + $scope.selections.country + '" website="' + $scope.selections.clienttype + '" language="' + $scope.selections.language + '" isin="' + $scope.selections.fund + '" app="{}"></div>\n<!--ENTRY CHARGE CHART WIDGET END-->';
            }
        }

        $scope.isOptionsLoading = function() {
            return $scope.isLoading;
        }

    }
]);

angular.module('SDCHART').controller('EntryChargeController', ['$scope', '$rootScope', '$http', '$filter', '$translate', 'DataService', 'ChartDataService', 'ErrorHandler',
    function($scope, $rootScope, $http, $filter, $translate, DataService, ChartDataService, ErrorHandler) {

        $scope.DataService = DataService;
        $scope.isLoading = DataService.entryChargeLoading;

        $scope.ChartDataService = ChartDataService;

        $scope.ErrorHandler = ErrorHandler;
        $scope.isError = ErrorHandler.isError;
        $scope.getError = ErrorHandler.getError;

        $scope.entryChargeData = null;
        $scope.disclaimer = '';

        $scope.translate = $translate;
        
        DataService.lang = $rootScope.config.Params.Language;

        var fund = $rootScope.config.Params.Fund;

        if(fund != '') {
            // API CALL TO RETRIEVE ENTRY CHARGE CHART DATA
            DataService.API_getEntryChargeData({'request':{"fund": fund}}).then(function(res) {

                var entryChargeData = DataService.parseEntryChargeData(res);
                if(entryChargeData.categories.length > 0) {
                    $scope.entryChargeData = entryChargeData;
                    if(res.Tables[0].Rows[0].InitialCharge){
                        var aDisclTemplate = $filter('translate')('entCrtDisclaimer', $rootScope.config.Params.Language).split('{INITIALCHARGES}');
                        $scope.disclaimer = aDisclTemplate[0]+res.Tables[0].Rows[0].InitialCharge+aDisclTemplate[1];
                    }
                }
                else {
                    ErrorHandler.setError('noDataForTheSpecifiedFund');
                }
            });
        } else {
            ErrorHandler.setError('noFundsAdded');
            // HIDE EVERYTHING BUT THE FUND AUTOCOMPLETE FIELD TO ADD A FUND
        }
    }
]);

