myapp.controller('ActivitiesController', function($scope,$stateParams,$state,activitiesSRV,loaderSRV) {

  if($stateParams.searchInput != undefined || $stateParams.day != undefined){
      loaderSRV.start();
      activitiesSRV.search($stateParams.searchInput,$stateParams.day)
      .success(function(data){
        $scope.activities=data;
        loaderSRV.end();
      })
  }


  if($stateParams.filter != undefined || $stateParams.value != undefined){
      loaderSRV.start();
      activitiesSRV.filter($stateParams.filter,$stateParams.value)
      .success(function(data){
        console.log (data);
        $scope.activities=data;
        console.log($scope.activities);
        loaderSRV.end();
      })
  }



  $scope.openActivity= function(activityID){
    $state.go("activity", {activityID:activityID});
  }
});