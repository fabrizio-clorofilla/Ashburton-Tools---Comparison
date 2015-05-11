<div id="mgt-2__tabs-4" ng-init="table=getTabIndex('risk')" data-tabletitle="{{tab.label | translate}}">
<div class="mgt-2__asatdate" ng-bind="(table.title[0] | translate | capitalize)+' '+table.title[1]"></div>
<table class="mgt-2__cumulative">
	<colgroup>
		<col><col><col><col><col><col>
	</colgroup>
	<thead>
		<tr>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th ng-repeat="header in table.headers" class="mgt-2__table--value"><abbr>{{header.label | translate}} <i class="fa fa-info-circle"></i><span><strong>{{header.label | translate}}:</strong> {{header.tooltip | translate}}</span></abbr></th>
		</tr>
		<tr>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th class="mgt-2__table--value">{{'3Y' | translate}}</th>
			<th class="mgt-2__table--value">{{'3Y' | translate}}</th>
			<th class="mgt-2__table--value">{{'3Y' | translate}}</th>
			<th class="mgt-2__table--value">{{'3Y' | translate}}</th>
		</tr>
	</thead>
	<tbody>
		<tr ng-repeat="row in table.data" class="mgt-2__table--benchmark" rowid="{{row.Index}}" type="{{row.Type}}" table-row ng-class="applyClass(row.Type,row.Index,row.Visible)" ng-mouseenter="toggleRemove(true)" ng-mouseleave="toggleRemove(false)">
					<td class="mgt-2__table--legend" ng-style="{'background-color': row.Color}" ng-class="applyClass(row.Type,row.Index)">
						<a href="#" class="mgt-2__table--remove" ng-class="{'mgt-2__table--showRemove': showRemove}" ng-click="deleteSeries('dynamic')" ng-hide="isInitFund('{{row.Type}}','{{row.Index}}')"><i class="fa fa-times"></i></a>
						<!-- <a href="#" class="mgt-2__table--toggle" ng-click="toggleSeries('dynamic')" ng-hide="isInitFund('{{row.Type}}','{{row.Index}}')"><i class="fa fa-dot-circle-o"></i></a> -->
					</td>
			<td ng-mouseenter="highlightSeries('dynamic')" ng-mouseleave="restoreTickness('dynamic')" ng-click="toggleSeries('dynamic')">{{row.Name}}</td>
			<td ng-repeat="value in row.Values track by $index" class="mgt-2__table--value" ng-mouseenter="highlightSeries('dynamic')" ng-mouseleave="restoreTickness('dynamic')" ng-click="toggleSeries('dynamic')">{{value | percentage}}</td>
		</tr>
	</tbody>
</table>
</div>