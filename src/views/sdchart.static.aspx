<div class="mgt mgt-1" ng-controller="MainController" ng-cloak>
	<div class="error" ng-show="isError()"><p ng-repeat="error in getError()">{{'error' | translate | uppercase}}: {{error}}</p></div>
	<div class="loading" ng-show="isLoading() && !isError()"><img ng-src="__DEPLOYMENTURL__/_images/ajax-loader.gif"><br />{{'loading' | translate | uppercase}}</div>
	<ul ng-if="!isError()">
		<li>
			<div id="mgtchart01" class="mgt-1__chart" ng-controller="ChartController" ng-show="!isLoading()">
				<div linechart></div>
				<div class="mgt-1__chart--messages" ks-flashing-message status="{{MessageHandler.status}}"></div>
			</div>
		</li>
		<li>
			<div id="mgttable01" class="mgt-1__data" ng-controller="TabsController" ng-show="!isLoading()">
				<div id="mgt-1__tabs" class="mgt-1__tabs">
					<ul class="clearfix">
						<li ng-repeat="tab in tabs" tab-label ng-click="toggleTab($index)" ng-class="isActive(tab.visibility)"><a href="#" ng-class="isActive(tab.visibility)" ng-bind="tab.label | translate | capitalize"></a></li>
					</ul>
					<div perf-tab ng-repeat="tab in tabs" type="{{tab.type}}" index="{{tab.id}}" ng-show="tab.visibility"></div>
				</div>
				<p class="mgt-1--footnote" ng-show="!isLoading()" ng-bind-html="'chartFootnote' | translate"></p>
			</div>
		</li>
	</ul>
</div>