angular.module('recentResultControllerModule', ['soccerDashServices'])

.controller('RecentResultController',
  ['$scope', 'statsfcService',
    function($scope, statsfcService) {

  $scope.$watch('currentTeam', function(newVal, oldVal, scope) {

    if(newVal) {
      statsfcService.fetchData(getResultUrl(newVal.teampath))
      .then(function(data) {
        if (data.error === undefined) {
          $scope.resultData = data;

          $scope.date = formatDate(data[0].dateiso);
          
          $scope.homeTeam = data[0].home; 
          $scope.awayTeam = data[0].away; 
          
          $scope.homeScore = data[0].fulltime[0];
          $scope.awayScore = data[0].fulltime[1];

          $scope.homeGoals = [];
          $scope.awayGoals = [];

          for(var i = 0; i < data[0]['incidents'].length; i++) {
            if($scope.homeTeam === data[0]['incidents'][i]['team']) {
              $scope.homeGoals.push(data[0]['incidents'][i]);
            }else {
              $scope.awayGoals.push(data[0]['incidents'][i]);
            }
          }
        } else {
          $scope.showError = true;
          $scope.error = data.error;
        }
      });
    }
  });
}]);
