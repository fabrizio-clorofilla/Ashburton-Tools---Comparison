/**************************************************************************** 
This Java script code belongs to and is managed by Kurtosys Systems Inc
Fabrizio Clorofilla

03/02/2014 - Implementation starts
*****************************************************************************/

var mandg_wgt = angular.module('mandg_wgt', [
	// MANDG modules
	
	//'kurtosys.debug',
	'ngTouch',
])

.service('DataService', ['$http', '$q', function($http, $q){

	var URL = Deployment.URL;

	this.getLaunchDate = function() {
		
		var d = $q.defer();			
		$http({'method':'GET', 'url': URL.launchDate, cache: false})
			.then(function(response){
				d.resolve(response);
			});
		};
	
		return d.promise
	};
	this.getChartData = function() {

		var d = $q.defer();		
		$http({'method':'GET', 'url': URL.performanceChart, cache: false})
			.then(function(response){
				d.resolve(response);
			});
		};
	
		return d.promise
	};
	this.getChartData = function() {
		
		var d = $q.defer();	
		$http({'method':'GET', 'url': URL.performanceTabs, cache: false})
			.then(function(response){
				d.resolve(response);
			});
		};
	
		return d.promise
	};

}])