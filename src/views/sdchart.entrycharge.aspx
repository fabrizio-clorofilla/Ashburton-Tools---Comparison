<div class="mgt mgt-1" ng-controller="EntryChargeController" ng-cloak>
	<div class="loading" ng-show="isLoading() && !isError()"><img ng-src="__DEPLOYMENTURL__/_images/ajax-loader.gif"><br />{{'loading' | translate | uppercase}}</div>
	<div class="mgt-2__chart" barchart ng-show="!isLoading()"></div>
	<p class="mgt-1--footnote" ng-show="!isLoading()" ng-bind="disclaimer"></p>
</div>