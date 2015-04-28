angular.module('pascalprecht.translate').factory('$translateStaticFilesLoader', [
  '$q',
  '$http',
  function ($q, $http) {
    return function (options) {
      if (!options || (!options.prefix || !options.suffix || !options.langID)) {
        throw new Error('Couldn\'t load static files, no prefix or suffix specified!');
      }
      var deferred = $q.defer();
      window.KS_FE2.needXDomain()&&window.KS_FE2.isIE()&&window.KS_FE2.isIE()<10?$http.defaults.useXDomain=true:$http.defaults.useXDomain=false;
      $http({
        url: [
          options.prefix,
          options.key,
          options.suffix
        ].join(''),
        method: 'GET',
        params: ''
      }).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(options.key);
      });
      return deferred.promise;

    };
  }
]);


