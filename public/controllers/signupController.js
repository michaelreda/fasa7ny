myapp.controller('signupController',function ($scope,signupSRV) {
  var stage = 0;

  $scope.signupStepOne = function() {
    $scope.toot='yesssss';
    throw new Error();
   signupSRV.sendAccountDetails({'userName':$scope.userName,'password':$scope.password,'email':$scope.email,'type':$scope.type}).success();
  }


});
