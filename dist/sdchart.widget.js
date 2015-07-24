// Static and Dynamic Charting Widget Config
// Ashburton Implementation
// Rev 1.0
if(typeof console === "undefined"){
	console = {};
	console.log = function(){
		return;
	}
}

var JQ_VERSION = '1.7.2';

var WL_APPNAME = 'SDCHART';

// devcode: production
var WL_HOST = '//ashburtontools.kurtosysweb.com/funtools';
// endcode
// devcode: development
var WL_HOST = '//localhost:9002';
// endcode

// devcode: production
var WL_CSSFILES = [
//	'//cloud.webtype.com/css/a48c2f3e-f82c-4747-9c4a-630b03dcbcb8.css',
	WL_HOST+"/_styles/ks.sdchart.styles.css",
	'//fonts.googleapis.com/css?family=Roboto:400,100,300'
];
var WL_JSFILES = [
	WL_HOST+'/_scripts/ks.sdchart.app.js'
];
// endcode

// devcode: development
var WL_CSSFILES = [
//	'//cloud.webtype.com/css/a48c2f3e-f82c-4747-9c4a-630b03dcbcb8.css',
	WL_HOST+'/_styles/lib/font-awesome.min.css',
	WL_HOST+'/_styles/lib/select2.css',
	WL_HOST+'/_styles/sdchart.common.styles.css',
	WL_HOST+'/_styles/sdchart.static.styles.css',
	WL_HOST+'/_styles/sdchart.dynamic.styles.css',
	'//fonts.googleapis.com/css?family=Roboto:400,100,300'
];
var WL_JSFILES = [
	WL_HOST+'/_scripts/lib/es5-shim.min.js',
	WL_HOST+'/_scripts/lib/jquery-ui-1.10.4.custom.min.js',
	WL_HOST+'/_scripts/lib/ks_utils.js',
	WL_HOST+'/_scripts/lib/jshighcharts.js',
	WL_HOST+'/_scripts/lib/kurtosys.chart.js',
	WL_HOST+'/_scripts/lib/moment.js',
	WL_HOST+'/_scripts/lib/numeral_1.5.3.min.js',
	WL_HOST+'/_scripts/lib/kurtosys.chart.new.js',
	WL_HOST+'/_scripts/lib/kurtosys.chart.periodselector.js',
	WL_HOST+'/_scripts/lib/angular-route.js',
	WL_HOST+'/_scripts/lib/select2.js',
	WL_HOST+'/_scripts/sdchart.app.config.js',
	WL_HOST+'/_scripts/sdchart.app.angular-translation.js',
	WL_HOST+'/_scripts/sdchart.app.js',
	WL_HOST+'/_scripts/templates.js',
	WL_HOST+'/_scripts/sdchart.app.filters.js',
	WL_HOST+'/_scripts/sdchart.app.directives.js',
	WL_HOST+'/_scripts/sdchart.app.services.js',
	WL_HOST+'/_scripts/sdchart.app.controllers.js'
];
// endcode

// Static and Dynamic Charting Widget Loader
// M&G Implementation
// Rev 1.0

// Create elements for IE8
document.createElement('TEXT');
document.createElement('TYPEAHEAD-POPUP');
document.createElement('LEGEND');
document.createElement('NG-PROGRESS');

loadCSS = function(files) {
	for (var i = files.length - 1; i >= 0; i--) {
		var fileref=document.createElement("LINK");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", files[i]);
		document.body.appendChild(fileref);
	};
}
loadCSS(WL_CSSFILES);

window.LoadJQueryUI = function(){
	setTimeout(function() {
		//console.log('ang')
		if (typeof jQuery.ui == 'undefined') {
		    // ui plugin DOES NOT exist
		    var jQueryUITag = document.createElement('SCRIPT');
		    jQueryUITag.type = 'text/javascript';
		    jQueryUITag.src = '//code.jquery.com/ui/1.10.4/jquery-ui.js'; // for devel-01, uat, prod
		    document.body.appendChild(jQueryUITag);
		}
	}, 0);
}

window.LoadTranslations = function() {
	setTimeout(function() {

		window.oTranslations = {};

		var langId = $('.ks-widget-sd').eq(0).attr('language');
		var baseURL = 'http://ashburtontools.kurtosysweb.com';
		var clientName = 'ASHBURTONTOOLS';
		var dataSource = '2bde98b3-d9bb-4a24-8de2-9cb1e2aee34c';

		var url = baseURL + '/KAPI/Wrapper.aspx?provider='+clientName+'&datasource=' + dataSource + '&params=<Parameters><Parameter Name="LanguageId" Type="StringLong" Value="' + langId + '"/></Parameters>&_='+Math.floor((Math.random() * Math.pow(10,10)) + 1);

		$.getJSON(url + "&callback=?", null, function(response) {
			if(typeof response == "string" && response.toLowerCase().indexOf('error')!=-1){

			}
			else{
		    var aRawTranslations = response.Tables[0].Rows;
		    for (var i = 0; i < aRawTranslations.length; i++) {
		      window.oTranslations[aRawTranslations[i].Key] = aRawTranslations[i].Value;
		    };
			}
			window.LoadAngular();
		})

	}, 0);
}

window.LoadAngular = function() {
	setTimeout(function() {
		//console.log('ang')
		var angularTag = document.createElement('SCRIPT');
		angularTag.type = 'text/javascript';

		// angularTag.src = '//ajax.googleapis.com/ajax/libs/angularjs/'+NG_VERSION+'/angular.js';
		// angular 1.2.1 cannot handle XD ajax requests on IE8/9. Created a new fork from that version and updated with XDR request
		// https://github.com/angular/angular.js/pull/1047#issuecomment-25023290

		angularTag.src = WL_HOST+'/_scripts/angular-xdomain-fixed.js'; // for devel-01, uat, prod

		// devcode: production
		angularTag.src = WL_HOST+'/_scripts/angular-xdomain-fixed.js';
		// endcode
		// devcode: development
		angularTag.src = WL_HOST+'/_scripts/lib/angular-xdomain-fixed.js';
		// endcode

		document.body.appendChild(angularTag);
		if(angularTag.addEventListener) {
			angularTag.addEventListener("load",function() {
					LoadWidget();
				},false);
			}
		else if(angularTag.readyState) {
			angularTag.onreadystatechange = function() {
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					LoadWidget();
				}
			};
		}
	}, 0);
}

var sdchart_static_widget = null;

if(typeof jQuery=='undefined') {

	setTimeout(function() {

		var jqTag = document.createElement('SCRIPT');
		jqTag.type = 'text/javascript';
		jqTag.src = '//ajax.googleapis.com/ajax/libs/jquery/'+JQ_VERSION+'/jquery.js';
		if(jqTag.addEventListener) {
			jqTag.addEventListener("load",function() {
				//console.log('loadang')
				window.LoadJQueryUI();
				window.LoadTranslations();
			},false);
		}
		else if(jqTag.readyState) {
			//console.log('readyState')
			jqTag.onreadystatechange = function() {
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					//console.log('loadang')
					window.LoadJQueryUI();
					window.LoadTranslations();
				}
			};
		}
		document.body.appendChild(jqTag);
	}, 0);

}
else {
  window.LoadJQueryUI();
  window.LoadTranslations();
}

LoadWidget = function() {

	//console.log('widget')

	var loadJS = {
		idx: -1,
		success: function() {
			sdchart_static_widget = $('.ks-widget-sd');
			if(sdchart_static_widget){
				for(var i=0; i < sdchart_static_widget.length; i++){

					if(sdchart_static_widget[i] != null){
						sdchart_static_widget[i].style.cssText='';
					}
					angular.bootstrap(sdchart_static_widget[i], [WL_APPNAME]);

				};
			} else {
				angular.bootstrap(document, [WL_APPNAME]);
			}


		},
		load: function(jsfiles){

			loadJS.idx++;

			//console.log('loading', jsfiles);
			if(typeof jsfiles == 'string') {


				if(loadJS.idx <= loadJS.jsfiles.length) {

					var jqTag = document.createElement('SCRIPT');
					jqTag.type = 'text/javascript';
					jqTag.src = jsfiles;
					if(jqTag.addEventListener) {
						jqTag.addEventListener("load",function() {
							////console.log('loaded', jsfiles);
							////console.log('---------------- Loading ', loadJS.idx, '/',  loadJS.jsfiles.length, '---------------------')
							if(loadJS.idx == loadJS.jsfiles.length){
								loadJS.success();
							} else {
								loadJS.load(loadJS.jsfiles[loadJS.idx]);
							}
						},false);
					}
					else if(jqTag.readyState) {
						jqTag.onreadystatechange = function() {
							if (this.readyState == 'complete' || this.readyState == 'loaded') {
								////console.log('loaded', jsfiles);
								////console.log('----------------', loadJS.idx, loadJS.jsfiles.length, '---------------------')
								if(loadJS.idx == loadJS.jsfiles.length){
									loadJS.success();
								} else {
									loadJS.load(loadJS.jsfiles[loadJS.idx]);
								}
							}
						};
					}
					document.body.appendChild(jqTag);
				}



				if(loadJS.idx >= loadJS.jsfiles.length){

				}


			} else {
				////console.log('arr')
				loadJS.jsfiles = jsfiles;
				loadJS.load(jsfiles[loadJS.idx]);
			}
		}
	}


	loadJS.load(WL_JSFILES)

}
