<div id="mgt-1__tabs-{{tab.id}}" ng-init="table=getTabIndex('calyr')">
	<table>
		<colgroup>
			<col><col><col><col><col><col>
		</colgroup>
	<thead>
		<tr>
			<th colspan="6"  ng-bind="(table.title[0] | translate | capitalize)+' '+(table.title[1] | translate)+' '+table.title[2]"></th>
		</tr>
	</thead>
	<tbody>
		<tr class="mgt-1__data--dateYTD">
			<td></td>
			<td ng-repeat="year in table.headers">{{year.Year}}</td>
		</tr>

		<tr ng-repeat="row in table.data" class="mgt-1__data--{{row.Type}}" rowid="{{row.Index}}" type="{{row.Type}}" table-row ng-style="applyBackground('{{row.Type}}','{{row.Color}}')" ng-click="toggleSeries('static')" ng-mouseenter="highlightSeries('static')" ng-mouseleave="restoreTickness('static')">
			<td><i ng-hide="isFund('{{row.Type}}')" class="fa fa-circle" ng-style="{'color': row.Color}">&nbsp;</i><strong>{{row.Name}}</strong></td>
			<td ng-repeat="value in row.Values track by $index">{{value | percentage}}</td>
		</tr>
	</tbody>
	</table>
</div>