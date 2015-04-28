	<script src="http://ashburtontools.kurtosysweb.com/fundtools/_scripts/sdchart.widget.js"></script>

		<div class="mgt--intro">
		<h1><strong>Ashburton Tools Creator</strong></h1>
		</div>

		<div class="ks-widget-sd ks-widget-sd-options" app="{}">
		<div class="mgt--options__container" ng-controller="ConfigGeneratorController">
				<div class="loading" ng-show="isOptionsLoading()"><div></div></div>
					<div class="mgt--options__config">
					<h2>Select Parameters</h2>
					<div class="mgt--options__selectParameters">
						<select ui-select2="" id="mgt--options--select--clienttype" ng-model="selections.clienttype" data-placeholder="Select Client Type">
							<option value=""></option>
							<option ng-repeat="elm in options.clientType  track by $index" value="{{elm.Code}}">{{elm.Title | uppercase}}</option><option>
						</option></select>
						<select ui-select2="" id="mgt--options--select--country" ng-model="selections.country" data-placeholder="Select Country">
							<option value=""></option>
							<option ng-repeat="elm in options.country track by $index" value="{{elm.Code}}">{{elm.Title | uppercase}}</option><option>
						</option></select>
						<select ui-select2="" id="mgt--options--select--language" ng-model="selections.language" data-placeholder="Select Language">
							<option value=""></option>
							<option ng-repeat="elm in options.language track by $index" value="{{elm.Code}}">{{elm.Title | uppercase}}</option><option>
						</option></select>
					</div>
					<h2>Select Fund</h2>
						<div class="mgt--options__selectFund">
						<select ui-select2="" id="mgt--options--select--fund" ng-model="selections.fund" data-placeholder="Select a fund">
							<option value=""></option>
							<option ng-repeat="elm in funds.dropdown track by $index | orderBy:elm.l" value="{{elm.v}}">{{elm.l}}</option><option>
						</option></select>
						</div>
					<h2>Options</h2>
						<!-- <div>
						<h3 class="clearfix">Performance Chart + Table (Static)<a class="btn-generate pull-right" ng-click="stage('static')">Generate</a></h3>
							<div class="clearfix">
							<h4>Performance Type</h4>
							<ul>
							<li><input type="radio" name="perfType1" value="net" checked="" ng-model="selections.static.perftype">Net</li>
							<li><input type="radio" name="perfType1" value="gross" ng-model="selections.static.perftype">Gross</li>	
							</ul>
							</div>
						</div> -->
						<div>
						<h3 class="clearfix">Performance Chart (Interactive)<a class="btn-generate pull-right" ng-click="stage('dynamic')">Generate</a></h3>
							<div class="divider clearfix">
							<h4>Performance Type</h4>
							<ul>
								<li><input type="radio" name="perfType2" value="net" checked="" ng-model="selections.dynamic.perftype">Net</li>
								<li><input type="radio" name="perfType2" value="gross" ng-model="selections.dynamic.perftype">Gross</li>
							</ul>
							</div>
							<div class="divider clearfix">
							<h4>Performance Tabs</h4>
							<ul>
								<li><input type="checkbox" ng-model="selections.dynamic.hidetab[0]" ng-true-value="" ng-false-value="ytoy" checked="">Year To Year</li>
								<li><input type="checkbox" ng-model="selections.dynamic.hidetab[1]" ng-true-value="" ng-false-value="calyr" checked="">Calendar Year</li>
								<li><input type="checkbox" ng-model="selections.dynamic.hidetab[2]" ng-true-value="" ng-false-value="cum" checked="">Cumulative</li>
								<li><input type="checkbox" ng-model="selections.dynamic.hidetab[3]" ng-true-value="" ng-false-value="risk" checked="">Risk Measure</li>
							</ul>
							</div>
							<div class="clearfix">
							<h4>Comparison Items</h4>
							<ul>
								<li><input type="checkbox" ng-model="selections.dynamic.hideelement[0]" ng-true-value="" ng-false-value="benchmark">Indexes</li>
								<li><input type="checkbox" ng-model="selections.dynamic.hideelement[1]" ng-true-value="" ng-false-value="sector">Sectors</li>
							</ul>
							</div>
						</div>
						<h3 class="clearfix">Fund Comparison Tool (Interactive)<a class="btn-generate pull-right" ng-click="stage('dynamicNoFund')">Generate</a></h3>
						<!-- <div class="germany-only"></div>
						<h3 class="clearfix germany-only">Entry Charge Chart (Static)<a class="btn-generate pull-right" ng-click="stage('entryCharge')">Generate</a></h3> -->
					</div>
					<div class="mgt--options__code">
						<!-- <pre data-item="static chart widget code" ng-bind="div.static"></pre> -->
						<pre data-item="dynamic chart widget code" ng-bind="div.dynamic"></pre>
						<pre data-item="no fund dynamic chart widget code" ng-bind="div.dynamicNoFund"></pre>
						<!-- <pre data-item="entry charge chart widget code" class="germany-only" ng-bind="div.entryCharge"></pre> -->
					</div>
				</div>

				<div class="mgt-2--copyright clearfix" style="padding-right: 20px"><a href="http://www.kurtosys.com" target="_blank" title="Kurtosys Systems | Beautiful Software"><img src="https://mandgtools.kurtosysweb.com/_images/Kurtosys_logo_tinyalpha.png" target="_blank" class="pull-right"></a></div></div>