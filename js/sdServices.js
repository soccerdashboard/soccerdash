var soccerDashServices = angular.module('soccerDashServices', ['ngResource']);

soccerDashServices.service('statsfcService', 
 ['$rootScope', '$http', '$q',
   function($rootScope, $http, $q) {
 
   var getTeams = function(competition, year) {
     var url = 'http://api.statsfc.com/table.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k'+
               '&competition='+ competition + '&year=' + year + '&callback=JSON_CALLBACK';

     var d = $q.defer();

     $http.jsonp(url)
     .success(function(data, status, headers) {
       d.resolve(data);
     })
     .error(function(data, status, headers) {
       d.reject(data);
     });

     return d.promise;
   };

   return {
     getTeams: getTeams
   }

}]);