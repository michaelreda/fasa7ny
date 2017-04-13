myapp.controller('ActivitiesController', function($scope,$stateParams,activitiesSRV) {

  if($stateParams.searchInput != undefined || $stateParams.day != undefined){
      activitiesSRV.search($stateParams.searchInput,$stateParams.day)
      .success(function(data){
        $scope.activities=data;
        console.log($scope.activities);
      })
  }
});
