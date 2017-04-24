myapp.controller('addActivityController', function($scope, $state, addActivitySRV){
  $scope.addActivity=function(){
    addActivitySRV.addActivity($scope.title, $scope.type, $scope.durationInMinutes,$scope.minClientNumber,$scope.maxClientNumber,$scope.minAge,$scope.maxAge,$scope.theme,$scope.prices).success(function(){
      toastr.success('Activity added succcessfully');

    })
  }
});
