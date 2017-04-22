myapp.controller('ActivitiesController', function($scope,$stateParams,$state,activitiesSRV,loaderSRV) {

  $scope.currentPage=1;

  if($stateParams.searchInput != undefined || $stateParams.day != undefined){
      loaderSRV.start();
      activitiesSRV.search($stateParams.searchInput,$stateParams.day)
      .success(function(data){
        for(var i=0;i<data.offers.length;i++){
          for(var j=0;j<data.offers.activities){
            
          }
        };
        loaderSRV.end();
      })
  }


  if($stateParams.filter != undefined || $stateParams.value != undefined){
      loaderSRV.start();
      activitiesSRV.filter($stateParams.filter,$stateParams.value)
      .success(function(data){
        console.log (data);
        $scope.activities=data.activities;
        console.log($scope.activities);
        loaderSRV.end();
      })
  }



  $scope.openActivity= function(activityID){
    $state.go("activity", {activityID:activityID});
  }
});
