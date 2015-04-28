<div id="mgt-2__tabs-3" ng-init="table=getTabIndex('cum')">
	<div class="mgt-2__asatdate" ng-bind="(table.title[0] | translate | capitalize)+' '+(table.title[1] | translate)+' '+table.title[2]"></div>
<table class="mgt-2__cumulative">
	<colgroup>
		<col><col><col><col><col><col><col><col>
	</colgroup>
	<thead>
		<tr>
			<th>&nbsp;</th>
			<th>&nbsp;<br>&nbsp;</th>
			<th ng-repeat="header in table.headers track by $index" class="mgt-2__table--value">{{header.period | translate | uppercase}}</th>
		</tr>
	</thead>
	<tbody>
		<tr ng-repeat="row in table.data" class="mgt-2__table--benchmark" rowid="{{row.Index}}" type="{{row.Type}}" table-row ng-class="applyClass(row.Type,row.Index,row.Visible)" ng-mouseenter="toggleRemove(true)" ng-mouseleave="toggleRemove(false)">
					<td class="mgt-2__table--legend" ng-style="{'background-color': row.Color}" ng-class="applyClass(row.Type,row.Index)">
						<a href="#" class="mgt-2__table--remove" ng-class="{'mgt-2__table--showRemove': showRemove}" ng-click="deleteSeries('dynamic')" ng-hide="isInitFund('{{row.Type}}','{{row.Index}}')"><i class="fa fa-times"></i></a>
						<!-- <a href="#" class="mgt-2__table--toggle" ng-click="toggleSeries('dynamic')" ng-hide="isInitFund('{{row.Type}}','{{row.Index}}')"><i class="fa fa-dot-circle-o"></i></a> -->
					</td>
			<td ng-bind="row.Name | translate" ng-mouseenter="highlightSeries('dynamic')" ng-mouseleave="restoreTickness('dynamic')" ng-click="toggleSeries('dynamic')"></td>
			<td ng-repeat="value in row.Values track by $index" class="mgt-2__table--value" ng-mouseenter="highlightSeries('dynamic')" ng-mouseleave="restoreTickness('dynamic')" ng-click="toggleSeries('dynamic')">{{value | percentage}}</td>
		</tr>
	</tbody>
</table>
</div>