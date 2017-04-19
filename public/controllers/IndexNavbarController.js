myapp.controller('IndexNavbarController',function($scope,$state,landingPageSRV){
  var user={};

  $scope.logout = function(){
    landingPageSRV.logout().success(function(data){
      $scope.logoutOK=data.ok;
      user={};
    })
  }

  $scope.isLoggedIn = function() {
    return 0;
  }

  $scope.signup = function(){
    $state.go("signupLocal");
    }


});
