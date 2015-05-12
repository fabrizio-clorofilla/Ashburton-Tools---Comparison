<div id="mgt-2__tabs-1" ng-init="table=getTabIndex('ytoy')">
<table class="mgt-2__yeartoyear">
	<colgroup>
		<col><col><col><col><col><col><col><col>
	</colgroup>
	<thead>
		<tr ng-show="false">
			<th>&nbsp;</th>
			<th ng-bind="tab.label | translate" colspan="2"></th>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th>{{'from' | translate | capitalize}}<br>{{'to' | translate | capitalize}}</th>
			<th ng-repeat="year in table.headers" class="mgt-2__table--value">{{year.Start | stringToMoment: 'YYYYMMDD' |momentToString: 'DD.MM.YY'}}<br>{{year.End | stringToMoment: 'YYYYMMDD' | momentToString: 'DD.MM.YY'}}</th>
		</tr>
	</thead>
	<tbody>
		<tr ng-repeat="row in table.data" class="mgt-2__table--benchmark" rowid="{{row.Index}}" type="{{row.Type}}" table-row ng-class="applyClass(row.Type,row.Index,row.Visible)" ng-mouseenter="toggleRemove(true)" ng-mouseleave="toggleRemove(false)">
			<td class="mgt-2__table--legend" ng-style="{'background-color': row.Color}" ng-class="applyClass(row.Type,row.Index)">
				<a href="#" class="mgt-2__table--remove" ng-class="{'mgt-2__table--showRemove': showRemove}" ng-click="deleteSeries('dynamic')"><i class="fa fa-times"></i></a>
				<!-- <a href="#" class="mgt-2__table--toggle" ng-click="toggleSeries('dynamic')" ng-hide="isInitFund('{{row.Type}}','{{row.Index}}')"><i class="fa fa-dot-circle-o"></i></a> -->
			</td>
			<td ng-mouseenter="highlightSeries('dynamic')" ng-mouseleave="restoreTickness('dynamic')" ng-click="toggleSeries('dynamic')">{{row.Name}}</td>
			<td>&nbsp;</td>
			<td ng-repeat="value in row.Values track by $index" class="mgt-2__table--value" ng-mouseenter="highlightSeries('dynamic')" ng-mouseleave="restoreTickness('dynamic')" ng-click="toggleSeries('dynamic')">{{value | percentage}}</td>
		</tr>
	</tbody>
</table>
</div>