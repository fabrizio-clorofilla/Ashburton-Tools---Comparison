/**************************************************************************** 
Static&Dynamic Charting Widgets
This Java script code belongs to and is managed by Kurtosys Systems Inc
Fabrizio Clorofilla

03/02/2014 - Implementation starts
*****************************************************************************/

angular.module('SDCHART',[
	'sdchart.directives'
	,'ui.kurtosys.buttons'
	,'pascalprecht.translate'
])
.config(['$httpProvider', function($httpProvider) {
 //$httpProvider.responseInterceptors.push('ErrorInterceptor');
 delete $httpProvider.defaults.headers.common['X-Requested-With'];
 delete $httpProvider.defaults.headers.common['Origin'];
 var config = new SDCHART_STATIC_CONFIG();
 window.KS.needXDomain(config.SITE_URL)&&window.KS.isIE()&&window.KS.isIE()<10?$httpProvider.defaults.useXDomain=true:$httpProvider.defaults.useXDomain=false;
}])
.config(['$sceProvider', function($sceProvider) {
 // Completely disable SCE.  For widget code only!
 // Do not use in new projects!
 $sceProvider.enabled(false);
}])
/**
 * @name $translateProvider
 * @memberof FE2
 *
 * @description
 * Loads translation from Translations.aspx
 * @returns {JSON} with translated key-value pairs
 *
 */
 .config(['$translateProvider', function($translateProvider) {

	// // i18n
	// $translateProvider.useStaticFilesLoader({
	// 	key: 'en-EN'
	// });

	// $translateProvider.preferredLanguage('en-EN');

	$translateProvider.translations(window.oTranslations);

}]);

var test = 'dev';
