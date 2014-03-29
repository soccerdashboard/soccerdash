angular.module('teamTopScorersControllerModule', ['soccerDashServices'])

.controller('TeamTopScorersController',
  ['$scope', 'statsfcService',
    function($scope, statsfcService) {

  $scope.$watch('currentTeam', function(newVal, oldVal, scope) {
    if(newVal) {
      $scope.showLoading = true;

      statsfcService.fetchData(getTeamTopScorersUrl(newVal.teampath))
      .then(function(data) {
        if (data.error === undefined) {
          $scope.goalData = data.slice(0,8);
          $scope.showLoading = false;
          $scope.showGoal = true;
        } else {
          $scope.showLoading = false;
          $scope.showError = true;
          $scope.error = data.error;
        }
      });
    }
  });

}]);
