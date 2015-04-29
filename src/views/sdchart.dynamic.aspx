<div class="mgt mgt-2" ng-controller="MainController" height-calc="test">
<div class="error" ng-show="isError()"><p ng-repeat="error in getError()">ERROR: {{error}}</p></div>
<div class="loading" ng-show="isLoading() && DataService.status.fundAdded"><div>
<img ng-src="//ashburtontools.kurtosysweb.com/fundtools/_images/ajax-loader.gif">
<br />{{'loading' | translate | uppercase}}</div></div>
	<div class="mgt-2__tools" ng-controller="SearchController" ng-show="!isLoading('init') || !DataService.status.fundAdded">
		<div class="mgt-2__tools--compare" ng-show="!isLoading('init') && DataService.status.fundAdded">
		<label ng-bind="'compare' | translate | capitalize"></label>
		<input id="search-bar" autocomplete="off" type="text" ng-model="selections.item.typeahead" typeahead="item as item.Typeahead for item in results.searchList | filter:$viewValue | filter:filterInitList()" class="form-control" placeholder="{{searchBarPlaceholder}}" ng-click="selections.item.typeahead=''" ng-enter>
		<a href="#" class="btn mgt-2__tools--add" ng-click="addItem('typeahead')" type="typeahead" add-button><i class="fa fa-plus"></i></a>
		</div>
			<div class="mgt-2__tools--compare" ng-show="!DataService.status.fundAdded">
			<label ng-bind="'compare' | translate | capitalize"></label>
	    <input id="search-bar" autocomplete="off" type="text" ng-model="selections.item.typeahead" typeahead="item as item.Typeahead for item in results.searchList | filter:$viewValue | filter:{Type : 'F'}" class="form-control" placeholder="{{'search' | translate | capitalize}} {{'for' | translate}} {{'fund' | translate | capitalize}}" ng-click="selections.item.typeahead=''" ng-enter>
			<a href="#" class="btn mgt-2__tools--add" ng-click="addItem('typeahead')" type="typeahead" add-button><i class="fa fa-plus"></i></a>
			</div>
		<div class="mgt-2__tools--benchmark" ng-if="results.elements.length && DataService.status.fundAdded">
			<label ng-bind="'select' | translate | capitalize"></label>
			<div class="mgt-2__tools--select">
			<select ui-select2="{minimumResultsForSearch: -1}" ng-model="selections.cat" data-placeholder="Select an element" class="mgt-2__tools--select--cat">
				<option value=""></option>
				<option ng-repeat="item in results.elements | orderBy:'label | translate'" value="{{item.value}}" ng-bind="item.label | translate"></option>
			</select>
			</div>
			<div class="mgt-2__tools--select">
			<select ui-select2 ng-model="selections.item.select" data-placeholder="{{'selectItem' | translate | capitalize}}" class="mgt-2__tools--select--item">
				<option value=""></option>
				<option ng-repeat="item in results.searchList | filter:{Type: selections.cat}" value="{{item}}">{{item.Name}}</option>
			</select>
			</div>
			<a href="#" class="btn mgt-2__tools--add" ng-click="addItem('select')" type="select" add-button><i class="fa fa-plus"></i></a>
		</div>
	</div>
	<div class="mgt-2__noFundMsg" ng-show="!DataService.status.fundAdded"><p><i class="fa fa-arrow-up"></i>Please select a fund from the Compare list to start the tool.</p></div>
	<div class="mgt-2__chart" ng-controller="ChartController" ng-show="!isLoading('init') && DataService.status.fundAdded">
		<div class="mgt-2__chart--tools clearfix" chart-tools>
		<ul class="mgt-2__chart--buttons clearfix">
		    <li class="mgt-2__daterange pull-left"><label ng-bind="'selectDateRange' | translate | capitalize"></label>&nbsp;&nbsp;&nbsp;<div class="mgt-2__daterange" ng-class="{active: PeriodSelector.Data.plot.period.label == 'DatePicker'}" ks-datepicker-model="DatePicker" min-date="{{PeriodSelector.Data.list.DatePicker.from | momentToString: 'YYYY-MM-DD'}}" max-date="" start-date="{{PeriodSelector.Data.plot.period.from | momentToString: 'DD/MM/YYYY'}}" end-date="{{PeriodSelector.Data.plot.period.to | momentToString: 'DD/MM/YYYY'}}" min-daterange="90" lang="{{DataService.lang}}" ks-datepicker ng-if="!isLoading('init')"></div></li>
		    <li class="mgt-2__bgroup mgt-2__bgroup--actions pull-right">
		    	<ul class="clearfix">
			    <li ng-click="printScreen()"><a>Print data sheet&nbsp;&nbsp;<i class="fa fa-print"></i></a></li>
			    <li ng-click="exportToExcel()"><a>Export to Excel&nbsp;&nbsp;<i class="fa fa-file"></i></a></li>
		    	</ul>
		    </li>
		    <li class="mgt-2__bgroup pull-right">
		    	<ul class="clearfix">
		    		<li ng-class="{unavailable: !PeriodSelector.Data.list['1Y'].available, active: PeriodSelector.Data.plot.period.label == '1Y'}" ng-click="setPeriodToPlot('1Y')" ng-init="addPeriod('1Y')" ng-bind="'1Y' | translate | uppercase"></li>
		    		<li ng-class="{unavailable: !PeriodSelector.Data.list['3Y'].available, active: PeriodSelector.Data.plot.period.label == '3Y'}" ng-click="setPeriodToPlot('3Y')" ng-init="addPeriod('3Y')" ng-bind="'3Y' | translate | uppercase"></li>
		    		<li ng-class="{unavailable: !PeriodSelector.Data.list['5Y'].available, active: PeriodSelector.Data.plot.period.label == '5Y'}" ng-click="setPeriodToPlot('5Y')" ng-init="addPeriod('5Y')" ng-bind="'5Y' | translate | uppercase"></li>
		    		<li ng-class="{unavailable: !PeriodSelector.Data.list['ALL'].available, active: PeriodSelector.Data.plot.period.label == 'ALL'}" ng-click="setPeriodToPlot('ALL')" ng-init="addPeriod('ALL')" ng-bind="'ALL' | translate | uppercase"></li>
		    	</ul>
		    </li>
		</ul>

		<!--
			<div class="pull-right mgt-2__chart--buttons clearfix">
				<ul>
				<li class="mgt-2__daterange"><label ng-bind="'selectDateRange' | translate | capitalize"></label>&nbsp;&nbsp;&nbsp;<div class="mgt-2__daterange" ng-class="{active: PeriodSelector.Data.plot.period.label == 'DatePicker'}" ks-datepicker-model="DatePicker" min-date="{{PeriodSelector.Data.list.DatePicker.from | momentToString: 'YYYY-MM-DD'}}" max-date="" start-date="{{PeriodSelector.Data.plot.period.from | momentToString: 'DD/MM/YYYY'}}" end-date="{{PeriodSelector.Data.plot.period.to | momentToString: 'DD/MM/YYYY'}}" min-daterange="90" lang="{{DataService.lang}}" ks-datepicker ng-if="!isLoading('init')"></div></li>
				<li class="mgt-2__bgroup">
					<ul class="clearfix">
						<li ng-class="{unavailable: !PeriodSelector.Data.list['YTD'].available, active: PeriodSelector.Data.plot.period.label == 'YTD'}" ng-click="setPeriodToPlot('YTD')" ng-init="addPeriod('YTD')" ng-bind="'YTD'"></li>
						<li ng-class="{unavailable: !PeriodSelector.Data.list['1Y'].available, active: PeriodSelector.Data.plot.period.label == '1Y'}" ng-click="setPeriodToPlot('1Y')" ng-init="addPeriod('1Y')" ng-bind="'1Y' | translate | uppercase"></li>
						<li ng-class="{unavailable: !PeriodSelector.Data.list['3Y'].available, active: PeriodSelector.Data.plot.period.label == '3Y'}" ng-click="setPeriodToPlot('3Y')" ng-init="addPeriod('3Y')" ng-bind="'3Y' | translate | uppercase"></li>
						<li ng-class="{unavailable: !PeriodSelector.Data.list['5Y'].available, active: PeriodSelector.Data.plot.period.label == '5Y'}" ng-click="setPeriodToPlot('5Y')" ng-init="addPeriod('5Y')" ng-bind="'5Y' | translate | uppercase"></li>
						<li ng-class="{unavailable: !PeriodSelector.Data.list['10Y'].available, active: PeriodSelector.Data.plot.period.label == '10Y'}" ng-click="setPeriodToPlot('10Y')" ng-init="addPeriod('10Y')" ng-bind="'10Y' | translate | uppercase"></li>
						<li ng-class="{unavailable: !PeriodSelector.Data.list['ALL'].available, active: PeriodSelector.Data.plot.period.label == 'ALL'}" ng-click="setPeriodToPlot('ALL')" ng-init="addPeriod('ALL')" ng-bind="'ALL' | translate | uppercase"></li>
					</ul>
				</li>
				</ul>
			</div>
		-->

		</div>
		<div class="mgt-2__chart" linechart></div>
		<div class="mgt-2__chart--messages" ks-flashing-message status="{{MessageHandler.status}}"></div>

	</div>
	<div id="mgt-2__tabs" class="mgt-2__tabs mgt-2__table clearfix" ng-controller="TabsController" ng-show="!isLoading('init') && DataService.status.fundAdded">
		<ul class="clearfix tabs-nav">
			<li ng-repeat="tab in tabs" tab-label ng-click="toggleTab($index)" ng-class="isActive(tab.visibility)"><a href="#" ng-class="isActive(tab.visibility)" ng-bind="tab.label | translate"></a></li>
		</ul>
			<div perf-tab ng-repeat="tab in tabs" type="{{tab.type}}" index="{{tab.id}}" ng-show="tab.visibility"></div>
	</div>

	<!--
	<div class="mgt-2--copyright clearfix" ng-show="!isLoading('init') || !DataService.status.fundAdded"><p class="mgt-2--footnote" ng-show="DataService.status.fundAdded" ng-bind-html="'chartFootnote' | translate"></p><a href="http://www.kurtosys.com" target="_blank" title="Kurtosys Systems | Beautiful Software"/><img src="__DEPLOYMENTURL__/_images/Kurtosys_logo_tinyalpha.png" target="_blank" class="pull-right" /></a></div>
	-->

</div>
