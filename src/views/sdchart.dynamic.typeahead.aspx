<ul class="dropdown-menu" ng-if="isOpen()" ng-style="{top: position.top+'px', left: position.left+'px'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">
    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option">
        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl">{{match.label}} ({{match.model.Identifier}}) ({{match.model.Type}})</div>
    </li>
</ul>