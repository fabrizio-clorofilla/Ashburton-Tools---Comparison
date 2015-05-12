angular.module('SDCHART').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/sdchart.dynamic.aspx',
    "<div class=\"mgt mgt-2\" ng-controller=\"MainController\" height-calc=\"test\"><div class=\"error\" ng-show=\"isError()\"><p ng-repeat=\"error in getError()\">ERROR: {{error}}</p></div><div class=\"loading\" ng-show=\"isLoading() && DataService.status.fundAdded\"><div><img ng-src=\"//ashburtontools.kurtosysweb.com/fundtools/_images/ajax-loader.gif\"><br>{{'loading' | translate | uppercase}}</div></div><div class=\"mgt-2__tools\" ng-controller=\"SearchController\" ng-show=\"!isLoading('init') || !DataService.status.fundAdded\"><div class=\"mgt-2__tools--compare\" ng-show=\"!isLoading('init') && DataService.status.fundAdded\"><label ng-bind=\"'compare' | translate | capitalize\"></label><input id=\"search-bar\" autocomplete=\"off\" type=\"text\" ng-model=\"selections.item.typeahead\" typeahead=\"item as item.Typeahead for item in results.searchList | filter:$viewValue | filter:filterInitList()\" class=\"form-control\" placeholder=\"{{searchBarPlaceholder}}\" ng-click=\"selections.item.typeahead=''\" typeahead-on-select=\"addTypeahead($item)\" typeahead-tools> <a href=\"#\" class=\"btn mgt-2__tools--add\" ng-click=\"addItem('typeahead')\" type=\"typeahead\" add-button><i class=\"fa fa-plus\"></i></a></div><div class=\"mgt-2__tools--compare\" ng-show=\"!DataService.status.fundAdded\"><label ng-bind=\"'compare' | translate | capitalize\"></label><input id=\"search-bar\" autocomplete=\"off\" type=\"text\" ng-model=\"selections.item.typeahead\" typeahead=\"item as item.Typeahead for item in results.searchList | filter:$viewValue | filter:{Type : 'F'}\" class=\"form-control\" placeholder=\"{{'search' | translate | capitalize}} {{'for' | translate}} {{'fund' | translate | capitalize}}\" ng-click=\"selections.item.typeahead=''\" typeahead-on-select=\"addTypeahead($item)\" ng-enter typeahead-tools> <a href=\"#\" class=\"btn mgt-2__tools--add\" ng-click=\"addItem('typeahead')\" type=\"typeahead\" add-button><i class=\"fa fa-plus\"></i></a></div><div class=\"mgt-2__tools--benchmark\" ng-if=\"results.elements.length && DataService.status.fundAdded\"><label ng-bind=\"'select' | translate | capitalize\"></label><div class=\"mgt-2__tools--select\"><select ui-select2=\"{minimumResultsForSearch: -1}\" ng-model=\"selections.cat\" data-placeholder=\"Select an element\" class=\"mgt-2__tools--select--cat\"><option value=\"\"></option><option ng-repeat=\"item in results.elements | orderBy:'label | translate'\" value=\"{{item.value}}\" ng-bind=\"item.label | translate\"></option></select></div><div class=\"mgt-2__tools--select\"><select ui-select2 ng-model=\"selections.item.select\" data-placeholder=\"{{'selectItem' | translate | capitalize}}\" class=\"mgt-2__tools--select--item\"><option value=\"\"></option><option ng-repeat=\"item in results.searchList | filter:{Type: selections.cat}\" value=\"{{item}}\">{{item.Name}}</option></select></div><a href=\"#\" class=\"btn mgt-2__tools--add\" ng-click=\"addItem('select')\" type=\"select\" add-button><i class=\"fa fa-plus\"></i></a></div></div><div class=\"mgt-2__noFundMsg\" ng-show=\"!DataService.status.fundAdded\"><p><i class=\"fa fa-arrow-up\"></i>Please select a fund from the Compare list to start the tool.</p></div><div class=\"mgt-2__chart\" ng-controller=\"ChartController\" ng-show=\"!isLoading('init') && DataService.status.fundAdded\"><div class=\"mgt-2__chart--tools clearfix\" chart-tools><ul class=\"mgt-2__chart--buttons clearfix\"><li class=\"mgt-2__daterange pull-left\"><label ng-bind=\"'selectDateRange' | translate | capitalize\"></label>&nbsp;&nbsp;&nbsp;<div class=\"mgt-2__daterange\" ng-class=\"{active: PeriodSelector.Data.plot.period.label == 'DatePicker'}\" ks-datepicker-model=\"DatePicker\" min-date=\"{{PeriodSelector.Data.list.DatePicker.from | momentToString: 'YYYY-MM-DD'}}\" max-date=\"\" start-date=\"{{PeriodSelector.Data.plot.period.from | momentToString: 'DD/MM/YYYY'}}\" end-date=\"{{PeriodSelector.Data.plot.period.to | momentToString: 'DD/MM/YYYY'}}\" min-daterange=\"90\" lang=\"{{DataService.lang}}\" ks-datepicker ng-if=\"!isLoading('init')\"></div></li><li class=\"mgt-2__bgroup mgt-2__bgroup--actions pull-right\"><ul class=\"clearfix\"><li ng-click=\"printScreen()\"><a>Print data sheet&nbsp;&nbsp;<i class=\"fa fa-print\"></i></a></li><li ng-click=\"exportToExcel()\"><a>Export to Excel&nbsp;&nbsp;<i class=\"fa fa-file\"></i></a></li><li ng-click=\"resetTool()\"><a>Reset tool&nbsp;&nbsp;<i class=\"fa fa-trash-o\"></i></a></li></ul></li><li class=\"mgt-2__bgroup pull-right\"><ul class=\"clearfix\"><li ng-class=\"{unavailable: !PeriodSelector.Data.list['1Y'].available, active: PeriodSelector.Data.plot.period.label == '1Y'}\" ng-click=\"setPeriodToPlot('1Y')\" ng-init=\"addPeriod('1Y')\" ng-bind=\"'1Y' | translate | uppercase\"></li><li ng-class=\"{unavailable: !PeriodSelector.Data.list['3Y'].available, active: PeriodSelector.Data.plot.period.label == '3Y'}\" ng-click=\"setPeriodToPlot('3Y')\" ng-init=\"addPeriod('3Y')\" ng-bind=\"'3Y' | translate | uppercase\"></li><li ng-class=\"{unavailable: !PeriodSelector.Data.list['5Y'].available, active: PeriodSelector.Data.plot.period.label == '5Y'}\" ng-click=\"setPeriodToPlot('5Y')\" ng-init=\"addPeriod('5Y')\" ng-bind=\"'5Y' | translate | uppercase\"></li><li ng-class=\"{unavailable: !PeriodSelector.Data.list['ALL'].available, active: PeriodSelector.Data.plot.period.label == 'ALL'}\" ng-click=\"setPeriodToPlot('ALL')\" ng-init=\"addPeriod('ALL')\" ng-bind=\"'ALL' | translate | uppercase\"></li></ul></li></ul><!--\n" +
    "\t\t\t<div class=\"pull-right mgt-2__chart--buttons clearfix\">\n" +
    "\t\t\t\t<ul>\n" +
    "\t\t\t\t<li class=\"mgt-2__daterange\"><label ng-bind=\"'selectDateRange' | translate | capitalize\"></label>&nbsp;&nbsp;&nbsp;<div class=\"mgt-2__daterange\" ng-class=\"{active: PeriodSelector.Data.plot.period.label == 'DatePicker'}\" ks-datepicker-model=\"DatePicker\" min-date=\"{{PeriodSelector.Data.list.DatePicker.from | momentToString: 'YYYY-MM-DD'}}\" max-date=\"\" start-date=\"{{PeriodSelector.Data.plot.period.from | momentToString: 'DD/MM/YYYY'}}\" end-date=\"{{PeriodSelector.Data.plot.period.to | momentToString: 'DD/MM/YYYY'}}\" min-daterange=\"90\" lang=\"{{DataService.lang}}\" ks-datepicker ng-if=\"!isLoading('init')\"></div></li>\n" +
    "\t\t\t\t<li class=\"mgt-2__bgroup\">\n" +
    "\t\t\t\t\t<ul class=\"clearfix\">\n" +
    "\t\t\t\t\t\t<li ng-class=\"{unavailable: !PeriodSelector.Data.list['YTD'].available, active: PeriodSelector.Data.plot.period.label == 'YTD'}\" ng-click=\"setPeriodToPlot('YTD')\" ng-init=\"addPeriod('YTD')\" ng-bind=\"'YTD'\"></li>\n" +
    "\t\t\t\t\t\t<li ng-class=\"{unavailable: !PeriodSelector.Data.list['1Y'].available, active: PeriodSelector.Data.plot.period.label == '1Y'}\" ng-click=\"setPeriodToPlot('1Y')\" ng-init=\"addPeriod('1Y')\" ng-bind=\"'1Y' | translate | uppercase\"></li>\n" +
    "\t\t\t\t\t\t<li ng-class=\"{unavailable: !PeriodSelector.Data.list['3Y'].available, active: PeriodSelector.Data.plot.period.label == '3Y'}\" ng-click=\"setPeriodToPlot('3Y')\" ng-init=\"addPeriod('3Y')\" ng-bind=\"'3Y' | translate | uppercase\"></li>\n" +
    "\t\t\t\t\t\t<li ng-class=\"{unavailable: !PeriodSelector.Data.list['5Y'].available, active: PeriodSelector.Data.plot.period.label == '5Y'}\" ng-click=\"setPeriodToPlot('5Y')\" ng-init=\"addPeriod('5Y')\" ng-bind=\"'5Y' | translate | uppercase\"></li>\n" +
    "\t\t\t\t\t\t<li ng-class=\"{unavailable: !PeriodSelector.Data.list['10Y'].available, active: PeriodSelector.Data.plot.period.label == '10Y'}\" ng-click=\"setPeriodToPlot('10Y')\" ng-init=\"addPeriod('10Y')\" ng-bind=\"'10Y' | translate | uppercase\"></li>\n" +
    "\t\t\t\t\t\t<li ng-class=\"{unavailable: !PeriodSelector.Data.list['ALL'].available, active: PeriodSelector.Data.plot.period.label == 'ALL'}\" ng-click=\"setPeriodToPlot('ALL')\" ng-init=\"addPeriod('ALL')\" ng-bind=\"'ALL' | translate | uppercase\"></li>\n" +
    "\t\t\t\t\t</ul>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t\t</ul>\n" +
    "\t\t\t</div>\n" +
    "\t\t--></div><div class=\"mgt-2__chart\" linechart></div><div class=\"mgt-2__chart--messages\" ks-flashing-message status=\"{{MessageHandler.status}}\"></div></div><div id=\"mgt-2__tabs\" class=\"mgt-2__tabs mgt-2__table clearfix\" ng-controller=\"TabsController\" ng-show=\"!isLoading('init') && DataService.status.fundAdded\"><ul class=\"clearfix tabs-nav\"><li ng-repeat=\"tab in tabs\" tab-label ng-click=\"toggleTab($index)\" ng-class=\"isActive(tab.visibility)\"><a href=\"#\" ng-class=\"isActive(tab.visibility)\" ng-bind=\"tab.label | translate\"></a></li></ul><div perf-tab ng-repeat=\"tab in tabs\" type=\"{{tab.type}}\" index=\"{{tab.id}}\" ng-show=\"tab.visibility\" data-tabletitle=\"{{tab.label | translate}}\"></div></div><!--\n" +
    "\t<div class=\"mgt-2--copyright clearfix\" ng-show=\"!isLoading('init') || !DataService.status.fundAdded\"><p class=\"mgt-2--footnote\" ng-show=\"DataService.status.fundAdded\" ng-bind-html=\"'chartFootnote' | translate\"></p><a href=\"http://www.kurtosys.com\" target=\"_blank\" title=\"Kurtosys Systems | Beautiful Software\"/><img src=\"__DEPLOYMENTURL__/_images/Kurtosys_logo_tinyalpha.png\" target=\"_blank\" class=\"pull-right\" /></a></div>\n" +
    "\t--></div>"
  );


  $templateCache.put('views/sdchart.dynamic.calyr-tab.aspx',
    "<div id=\"mgt-2__tabs-2\" ng-init=\"table=getTabIndex('calyr')\"><div class=\"mgt-2__asatdate\" ng-bind=\"(table.title[0] | translate | capitalize)+' '+(table.title[1] | translate)+' '+table.title[2]\"></div><table class=\"mgt-2__calendaryear\"><colgroup><col><col><col><col><col><col><col></colgroup><thead><tr ng-show=\"false\"><th>&nbsp;</th><th ng-bind=\"tab.label | translate\" colspan=\"2\"></th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr><tr><th>&nbsp;</th><th>&nbsp;<br>&nbsp;</th><th ng-repeat=\"year in table.headers\" class=\"mgt-2__table--value\">{{year.Year}}</th></tr></thead><tbody><tr ng-repeat=\"row in table.data\" class=\"mgt-2__table--benchmark\" rowid=\"{{row.Index}}\" type=\"{{row.Type}}\" table-row ng-class=\"applyClass(row.Type,row.Index,row.Visible)\" ng-mouseenter=\"toggleRemove(true)\" ng-mouseleave=\"toggleRemove(false)\"><td class=\"mgt-2__table--legend\" ng-style=\"{'background-color': row.Color}\" ng-class=\"applyClass(row.Type,row.Index)\"><a href=\"#\" class=\"mgt-2__table--remove\" ng-class=\"{'mgt-2__table--showRemove': showRemove}\" ng-click=\"deleteSeries('dynamic')\"><i class=\"fa fa-times\"></i></a><!-- <a href=\"#\" class=\"mgt-2__table--toggle\" ng-click=\"toggleSeries('dynamic')\" ng-hide=\"isInitFund('{{row.Type}}','{{row.Index}}')\"><i class=\"fa fa-dot-circle-o\"></i></a> --></td><td ng-mouseenter=\"highlightSeries('dynamic')\" ng-mouseleave=\"restoreTickness('dynamic')\" ng-click=\"toggleSeries('dynamic')\">{{row.Name}}</td><td ng-repeat=\"value in row.Values track by $index\" class=\"mgt-2__table--value\" ng-mouseenter=\"highlightSeries('dynamic')\" ng-mouseleave=\"restoreTickness('dynamic')\" ng-click=\"toggleSeries('dynamic')\">{{value | percentage}}</td></tr></tbody></table></div>"
  );


  $templateCache.put('views/sdchart.dynamic.cum-tab.aspx',
    "<div id=\"mgt-2__tabs-3\" ng-init=\"table=getTabIndex('cum')\"><div class=\"mgt-2__asatdate\" ng-bind=\"(table.title[0] | translate | capitalize)+' '+(table.title[1] | translate)+' '+table.title[2]\"></div><table class=\"mgt-2__cumulative\"><colgroup><col><col><col><col><col><col><col><col></colgroup><thead><tr ng-show=\"false\"><th>&nbsp;</th><th ng-bind=\"tab.label | translate\" colspan=\"2\"></th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr><tr><th>&nbsp;</th><th>&nbsp;<br>&nbsp;</th><th ng-repeat=\"header in table.headers track by $index\" class=\"mgt-2__table--value\">{{header.period | translate | uppercase}}</th></tr></thead><tbody><tr ng-repeat=\"row in table.data\" class=\"mgt-2__table--benchmark\" rowid=\"{{row.Index}}\" type=\"{{row.Type}}\" table-row ng-class=\"applyClass(row.Type,row.Index,row.Visible)\" ng-mouseenter=\"toggleRemove(true)\" ng-mouseleave=\"toggleRemove(false)\"><td class=\"mgt-2__table--legend\" ng-style=\"{'background-color': row.Color}\" ng-class=\"applyClass(row.Type,row.Index)\"><a href=\"#\" class=\"mgt-2__table--remove\" ng-class=\"{'mgt-2__table--showRemove': showRemove}\" ng-click=\"deleteSeries('dynamic')\"><i class=\"fa fa-times\"></i></a><!-- <a href=\"#\" class=\"mgt-2__table--toggle\" ng-click=\"toggleSeries('dynamic')\" ng-hide=\"isInitFund('{{row.Type}}','{{row.Index}}')\"><i class=\"fa fa-dot-circle-o\"></i></a> --></td><td ng-bind=\"row.Name | translate\" ng-mouseenter=\"highlightSeries('dynamic')\" ng-mouseleave=\"restoreTickness('dynamic')\" ng-click=\"toggleSeries('dynamic')\"></td><td ng-repeat=\"value in row.Values track by $index\" class=\"mgt-2__table--value\" ng-mouseenter=\"highlightSeries('dynamic')\" ng-mouseleave=\"restoreTickness('dynamic')\" ng-click=\"toggleSeries('dynamic')\">{{value | percentage}}</td></tr></tbody></table></div>"
  );


  $templateCache.put('views/sdchart.dynamic.datepicker.aspx',
    "<div class=\"ks__datepicker--daterange\"><div class=\"ks__datepicker__date--from\"><div class=\"ks__datepicker__date--from--label\" ng-bind=\"'From' | translate | capitalize\"></div><input type=\"text\" class=\"ks__datepicker__date--from--input\" placeholder=\"{{'Pick a date' | translate | capitalize}}\" value=\"\"></div><div class=\"ks__datepicker__date--divider\"></div><div class=\"ks__datepicker__date--to\"><div class=\"ks__datepicker__date--to--label\" ng-bind=\"'To' | translate | capitalize\"></div><input type=\"text\" class=\"ks__datepicker__date--to--input\" placeholder=\"{{'Pick a date' | translate | capitalize}}\" value=\"\"></div><div class=\"ks__datepicker__icon\"><i class=\"fa fa-calendar\"></i></div></div>"
  );


  $templateCache.put('views/sdchart.dynamic.risk-tab.aspx',
    "<div id=\"mgt-2__tabs-4\" ng-init=\"table=getTabIndex('risk')\"><div class=\"mgt-2__asatdate\" ng-bind=\"(table.title[0] | translate | capitalize)+' '+table.title[1]\"></div><table class=\"mgt-2__risk\"><colgroup><col><col><col><col><col><col></colgroup><thead><tr ng-show=\"false\"><th>&nbsp;</th><th ng-bind=\"tab.label | translate\" colspan=\"2\"></th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr><tr><th>&nbsp;</th><th>&nbsp;</th><th ng-repeat=\"header in table.headers\" class=\"mgt-2__table--value\"><abbr>{{header.label | translate}} <i class=\"fa fa-info-circle\"></i><span><strong>{{header.label | translate}}:</strong> {{header.tooltip | translate}}</span></abbr></th></tr><tr><th>&nbsp;</th><th>&nbsp;</th><th class=\"mgt-2__table--value\">{{'3Y' | translate}}</th><th class=\"mgt-2__table--value\">{{'3Y' | translate}}</th><th class=\"mgt-2__table--value\">{{'3Y' | translate}}</th><th class=\"mgt-2__table--value\">{{'3Y' | translate}}</th></tr></thead><tbody><tr ng-repeat=\"row in table.data\" class=\"mgt-2__table--benchmark\" rowid=\"{{row.Index}}\" type=\"{{row.Type}}\" table-row ng-class=\"applyClass(row.Type,row.Index,row.Visible)\" ng-mouseenter=\"toggleRemove(true)\" ng-mouseleave=\"toggleRemove(false)\"><td class=\"mgt-2__table--legend\" ng-style=\"{'background-color': row.Color}\" ng-class=\"applyClass(row.Type,row.Index)\"><a href=\"#\" class=\"mgt-2__table--remove\" ng-class=\"{'mgt-2__table--showRemove': showRemove}\" ng-click=\"deleteSeries('dynamic')\"><i class=\"fa fa-times\"></i></a><!-- <a href=\"#\" class=\"mgt-2__table--toggle\" ng-click=\"toggleSeries('dynamic')\" ng-hide=\"isInitFund('{{row.Type}}','{{row.Index}}')\"><i class=\"fa fa-dot-circle-o\"></i></a> --></td><td ng-mouseenter=\"highlightSeries('dynamic')\" ng-mouseleave=\"restoreTickness('dynamic')\" ng-click=\"toggleSeries('dynamic')\">{{row.Name}}</td><td ng-repeat=\"value in row.Values track by $index\" class=\"mgt-2__table--value\" ng-mouseenter=\"highlightSeries('dynamic')\" ng-mouseleave=\"restoreTickness('dynamic')\" ng-click=\"toggleSeries('dynamic')\">{{value | percentage}}</td></tr></tbody></table></div>"
  );


  $templateCache.put('views/sdchart.dynamic.typeahead-match.aspx',
    "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>"
  );


  $templateCache.put('views/sdchart.dynamic.typeahead.aspx',
    "<ul class=\"dropdown-menu\" ng-if=\"isOpen()\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" style=\"display: block\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\"><li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\"><div typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\">{{match.label}} ({{match.model.Identifier}}) ({{match.model.Type}})</div></li></ul>"
  );


  $templateCache.put('views/sdchart.dynamic.ytoy-tab.aspx',
    "<div id=\"mgt-2__tabs-1\" ng-init=\"table=getTabIndex('ytoy')\"><table class=\"mgt-2__yeartoyear\"><colgroup><col><col><col><col><col><col><col><col></colgroup><thead><tr ng-show=\"false\"><th>&nbsp;</th><th ng-bind=\"tab.label | translate\" colspan=\"2\"></th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr><tr><th>&nbsp;</th><th>&nbsp;</th><th>{{'from' | translate | capitalize}}<br>{{'to' | translate | capitalize}}</th><th ng-repeat=\"year in table.headers\" class=\"mgt-2__table--value\">{{year.Start | stringToMoment: 'YYYYMMDD' |momentToString: 'DD.MM.YY'}}<br>{{year.End | stringToMoment: 'YYYYMMDD' | momentToString: 'DD.MM.YY'}}</th></tr></thead><tbody><tr ng-repeat=\"row in table.data\" class=\"mgt-2__table--benchmark\" rowid=\"{{row.Index}}\" type=\"{{row.Type}}\" table-row ng-class=\"applyClass(row.Type,row.Index,row.Visible)\" ng-mouseenter=\"toggleRemove(true)\" ng-mouseleave=\"toggleRemove(false)\"><td class=\"mgt-2__table--legend\" ng-style=\"{'background-color': row.Color}\" ng-class=\"applyClass(row.Type,row.Index)\"><a href=\"#\" class=\"mgt-2__table--remove\" ng-class=\"{'mgt-2__table--showRemove': showRemove}\" ng-click=\"deleteSeries('dynamic')\"><i class=\"fa fa-times\"></i></a><!-- <a href=\"#\" class=\"mgt-2__table--toggle\" ng-click=\"toggleSeries('dynamic')\" ng-hide=\"isInitFund('{{row.Type}}','{{row.Index}}')\"><i class=\"fa fa-dot-circle-o\"></i></a> --></td><td ng-mouseenter=\"highlightSeries('dynamic')\" ng-mouseleave=\"restoreTickness('dynamic')\" ng-click=\"toggleSeries('dynamic')\">{{row.Name}}</td><td>&nbsp;</td><td ng-repeat=\"value in row.Values track by $index\" class=\"mgt-2__table--value\" ng-mouseenter=\"highlightSeries('dynamic')\" ng-mouseleave=\"restoreTickness('dynamic')\" ng-click=\"toggleSeries('dynamic')\">{{value | percentage}}</td></tr></tbody></table></div>"
  );


  $templateCache.put('views/sdchart.entrycharge.aspx',
    "<div class=\"mgt mgt-1\" ng-controller=\"EntryChargeController\" ng-cloak><div class=\"loading\" ng-show=\"isLoading() && !isError()\"><img ng-src=\"__DEPLOYMENTURL__/_images/ajax-loader.gif\"><br>{{'loading' | translate | uppercase}}</div><div class=\"mgt-2__chart\" barchart ng-show=\"!isLoading()\"></div><p class=\"mgt-1--footnote\" ng-show=\"!isLoading()\" ng-bind=\"disclaimer\"></p></div>"
  );


  $templateCache.put('views/sdchart.options.aspx',
    "<script src=\"http://ashburtontools.kurtosysweb.com/fundtools/_scripts/sdchart.widget.js\"></script><div class=\"mgt--intro\"><h1><strong>Ashburton Tools Creator</strong></h1></div><div class=\"ks-widget-sd ks-widget-sd-options\" app=\"{}\"><div class=\"mgt--options__container\" ng-controller=\"ConfigGeneratorController\"><div class=\"loading\" ng-show=\"isOptionsLoading()\"><div></div></div><div class=\"mgt--options__config\"><h2>Select Parameters</h2><div class=\"mgt--options__selectParameters\"><select ui-select2=\"\" id=\"mgt--options--select--clienttype\" ng-model=\"selections.clienttype\" data-placeholder=\"Select Client Type\"><option value=\"\"></option><option ng-repeat=\"elm in options.clientType  track by $index\" value=\"{{elm.Code}}\">{{elm.Title | uppercase}}</option><option></option></select><select ui-select2=\"\" id=\"mgt--options--select--country\" ng-model=\"selections.country\" data-placeholder=\"Select Country\"><option value=\"\"></option><option ng-repeat=\"elm in options.country track by $index\" value=\"{{elm.Code}}\">{{elm.Title | uppercase}}</option><option></option></select><select ui-select2=\"\" id=\"mgt--options--select--language\" ng-model=\"selections.language\" data-placeholder=\"Select Language\"><option value=\"\"></option><option ng-repeat=\"elm in options.language track by $index\" value=\"{{elm.Code}}\">{{elm.Title | uppercase}}</option><option></option></select></div><h2>Select Fund</h2><div class=\"mgt--options__selectFund\"><select ui-select2=\"\" id=\"mgt--options--select--fund\" ng-model=\"selections.fund\" data-placeholder=\"Select a fund\"><option value=\"\"></option><option ng-repeat=\"elm in funds.dropdown track by $index | orderBy:elm.l\" value=\"{{elm.v}}\">{{elm.l}}</option><option></option></select></div><h2>Options</h2><!-- <div>\n" +
    "\t\t\t\t\t\t<h3 class=\"clearfix\">Performance Chart + Table (Static)<a class=\"btn-generate pull-right\" ng-click=\"stage('static')\">Generate</a></h3>\n" +
    "\t\t\t\t\t\t\t<div class=\"clearfix\">\n" +
    "\t\t\t\t\t\t\t<h4>Performance Type</h4>\n" +
    "\t\t\t\t\t\t\t<ul>\n" +
    "\t\t\t\t\t\t\t<li><input type=\"radio\" name=\"perfType1\" value=\"net\" checked=\"\" ng-model=\"selections.static.perftype\">Net</li>\n" +
    "\t\t\t\t\t\t\t<li><input type=\"radio\" name=\"perfType1\" value=\"gross\" ng-model=\"selections.static.perftype\">Gross</li>\t\n" +
    "\t\t\t\t\t\t\t</ul>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div> --><div><h3 class=\"clearfix\">Performance Chart (Interactive)<a class=\"btn-generate pull-right\" ng-click=\"stage('dynamic')\">Generate</a></h3><div class=\"divider clearfix\"><h4>Performance Type</h4><ul><li><input type=\"radio\" name=\"perfType2\" value=\"net\" checked ng-model=\"selections.dynamic.perftype\">Net</li><li><input type=\"radio\" name=\"perfType2\" value=\"gross\" ng-model=\"selections.dynamic.perftype\">Gross</li></ul></div><div class=\"divider clearfix\"><h4>Performance Tabs</h4><ul><li><input type=\"checkbox\" ng-model=\"selections.dynamic.hidetab[0]\" ng-true-value=\"\" ng-false-value=\"ytoy\" checked>Year To Year</li><li><input type=\"checkbox\" ng-model=\"selections.dynamic.hidetab[1]\" ng-true-value=\"\" ng-false-value=\"calyr\" checked>Calendar Year</li><li><input type=\"checkbox\" ng-model=\"selections.dynamic.hidetab[2]\" ng-true-value=\"\" ng-false-value=\"cum\" checked>Cumulative</li><li><input type=\"checkbox\" ng-model=\"selections.dynamic.hidetab[3]\" ng-true-value=\"\" ng-false-value=\"risk\" checked>Risk Measure</li></ul></div><div class=\"clearfix\"><h4>Comparison Items</h4><ul><li><input type=\"checkbox\" ng-model=\"selections.dynamic.hideelement[0]\" ng-true-value=\"\" ng-false-value=\"benchmark\">Indexes</li><li><input type=\"checkbox\" ng-model=\"selections.dynamic.hideelement[1]\" ng-true-value=\"\" ng-false-value=\"sector\">Sectors</li></ul></div></div><h3 class=\"clearfix\">Fund Comparison Tool (Interactive)<a class=\"btn-generate pull-right\" ng-click=\"stage('dynamicNoFund')\">Generate</a></h3><!-- <div class=\"germany-only\"></div>\n" +
    "\t\t\t\t\t\t<h3 class=\"clearfix germany-only\">Entry Charge Chart (Static)<a class=\"btn-generate pull-right\" ng-click=\"stage('entryCharge')\">Generate</a></h3> --></div><div class=\"mgt--options__code\"><!-- <pre data-item=\"static chart widget code\" ng-bind=\"div.static\"></pre> --><pre data-item=\"dynamic chart widget code\" ng-bind=\"div.dynamic\"></pre><pre data-item=\"no fund dynamic chart widget code\" ng-bind=\"div.dynamicNoFund\"></pre><!-- <pre data-item=\"entry charge chart widget code\" class=\"germany-only\" ng-bind=\"div.entryCharge\"></pre> --></div></div><div class=\"mgt-2--copyright clearfix\" style=\"padding-right: 20px\"><a href=\"http://www.kurtosys.com\" target=\"_blank\" title=\"Kurtosys Systems | Beautiful Software\"><img src=\"https://mandgtools.kurtosysweb.com/_images/Kurtosys_logo_tinyalpha.png\" target=\"_blank\" class=\"pull-right\"></a></div></div>"
  );


  $templateCache.put('views/sdchart.static.aspx',
    "<div class=\"mgt mgt-1\" ng-controller=\"MainController\" ng-cloak><div class=\"error\" ng-show=\"isError()\"><p ng-repeat=\"error in getError()\">{{'error' | translate | uppercase}}: {{error}}</p></div><div class=\"loading\" ng-show=\"isLoading() && !isError()\"><img ng-src=\"__DEPLOYMENTURL__/_images/ajax-loader.gif\"><br>{{'loading' | translate | uppercase}}</div><ul ng-if=\"!isError()\"><li><div id=\"mgtchart01\" class=\"mgt-1__chart\" ng-controller=\"ChartController\" ng-show=\"!isLoading()\"><div linechart></div><div class=\"mgt-1__chart--messages\" ks-flashing-message status=\"{{MessageHandler.status}}\"></div></div></li><li><div id=\"mgttable01\" class=\"mgt-1__data\" ng-controller=\"TabsController\" ng-show=\"!isLoading()\"><div id=\"mgt-1__tabs\" class=\"mgt-1__tabs\"><ul class=\"clearfix\"><li ng-repeat=\"tab in tabs\" tab-label ng-click=\"toggleTab($index)\" ng-class=\"isActive(tab.visibility)\"><a href=\"#\" ng-class=\"isActive(tab.visibility)\" ng-bind=\"tab.label | translate | capitalize\"></a></li></ul><div perf-tab ng-repeat=\"tab in tabs\" type=\"{{tab.type}}\" index=\"{{tab.id}}\" ng-show=\"tab.visibility\"></div></div><p class=\"mgt-1--footnote\" ng-show=\"!isLoading()\" ng-bind-html=\"'chartFootnote' | translate\"></p></div></li></ul></div>"
  );


  $templateCache.put('views/sdchart.static.calyr-tab.aspx',
    "<div id=\"mgt-1__tabs-{{tab.id}}\" ng-init=\"table=getTabIndex('calyr')\"><table><colgroup><col><col><col><col><col><col></colgroup><thead><tr><th colspan=\"6\" ng-bind=\"(table.title[0] | translate | capitalize)+' '+(table.title[1] | translate)+' '+table.title[2]\"></th></tr></thead><tbody><tr class=\"mgt-1__data--dateYTD\"><td></td><td ng-repeat=\"year in table.headers\">{{year.Year}}</td></tr><tr ng-repeat=\"row in table.data\" class=\"mgt-1__data--{{row.Type}}\" rowid=\"{{row.Index}}\" type=\"{{row.Type}}\" table-row ng-style=\"applyBackground('{{row.Type}}','{{row.Color}}')\" ng-click=\"toggleSeries('static')\" ng-mouseenter=\"highlightSeries('static')\" ng-mouseleave=\"restoreTickness('static')\"><td><i ng-hide=\"isFund('{{row.Type}}')\" class=\"fa fa-circle\" ng-style=\"{'color': row.Color}\">&nbsp;</i><strong>{{row.Name}}</strong></td><td ng-repeat=\"value in row.Values track by $index\">{{value | percentage}}</td></tr></tbody></table></div>"
  );


  $templateCache.put('views/sdchart.static.ytoy-tab.aspx',
    "<div id=\"mgt-1__tabs-{{tab.id}}\" ng-init=\"table=getTabIndex('ytoy')\"><table><colgroup><col><col><col><col><col><col></colgroup><thead><tr><th colspan=\"6\" ng-bind=\"(table.title[0] | translate | capitalize)+' ('+(table.title[1] | translate | capitalize)+' '+(table.title[2] | translate)+' '+(table.title[3] | translate | capitalize)+')'\"></th></tr></thead><tbody><tr class=\"mgt-1__data--dateFrom\"><td ng-bind=\"'from' | translate | capitalize\"></td><td ng-repeat=\"year in table.headers\">{{year.Start | stringToMoment: 'YYYYMMDD' | momentToString: 'DD.MM.YY'}}</td></tr><tr class=\"mgt-1__data--dateTo divider\"><td ng-bind=\"'to' | translate | capitalize\"></td><td ng-repeat=\"year in table.headers\">{{year.End | stringToMoment: 'YYYYMMDD' | momentToString: 'DD.MM.YY'}}</td></tr><tr ng-repeat=\"row in table.data\" class=\"mgt-1__data--{{row.Type}}\" rowid=\"{{row.Index}}\" type=\"{{row.Type}}\" table-row ng-style=\"applyBackground('{{row.Type}}','{{row.Color}}')\" ng-click=\"toggleSeries('static')\" ng-mouseenter=\"highlightSeries('static')\" ng-mouseleave=\"restoreTickness('static')\"><td><i ng-hide=\"isFund('{{row.Type}}')\" class=\"fa fa-circle\" ng-style=\"{'color': row.Color}\">&nbsp;</i><strong>{{row.Name}}</strong></td><td ng-repeat=\"value in row.Values track by $index\">{{value | percentage}}</td></tr></tbody></table></div>"
  );

}]);
