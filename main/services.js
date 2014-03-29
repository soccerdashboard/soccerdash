var soccerDashServices = angular.module('soccerDashServices', ['ngResource']);

soccerDashServices.cache = {};

soccerDashServices.service('statsfcService', 
 ['$http', '$q',
    function($http, $q) {

      //Here we won't use the fetch data function because we implement caching
      var fetchLeagueResultsData = function(urlString) {

        var d = $q.defer();
        var now = new Date();

        //If request done in 1 hour timeframe, provide cached data
        if (soccerDashServices.cache.cachedResults && (now - soccerDashServices.cache.lastCachedAt <= 1000 * 60 * 60)) {
          d.resolve(soccerDashServices.cache.cachedResults);
        } else {
          $http.jsonp(urlString)
          .success(function(data, status, headers) {
            var result = {data: data, cached: false};
            soccerDashServices.cache.cachedResults = {data: data, cached: true};
            soccerDashServices.cache.lastCachedAt = new Date();
            d.resolve(result);
          });
        }

        return d.promise;
      };

      var fetchData = function(urlString) {
        // var url = urlString;  

        var d = $q.defer();

        $http.jsonp(urlString)
        .success(function(data, status, headers) {
          d.resolve(data);
        })
        .error(function(data, status, headers) {
          d.reject(data);
        });

        return d.promise;
      }

    return {
      fetchData: fetchData,
      fetchLeagueResultsData: fetchLeagueResultsData
    }
}]);
