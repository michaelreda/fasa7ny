myapp.controller('filterController', function($scope,$stateParams,$state,filterActivitiesSRV) {

  
      filterActivitiesSRV.start();
      filterActivitiesSRV.search($stateParams.filter,$stateParams.value)
      .success(function(data){
        $scope.filter=data.filter;
        $scope.value=data.value;
        filterActivitiesSRV.end();
      })
  

 
});
