myapp.controller('IndexNavbarController',function($window,$scope,$state,landingPageSRV){

  $scope.logout = function(){
    landingPageSRV.logout().success(function(data){
       $window.localStorage.clear();
       $state.go("home");
    })
  }

  $scope.isLoggedIn = function() {
    return !($window.localStorage['userAccount']==undefined);
  }

  $scope.signupStatechange = function(){
    $state.go("signupLocal");
    }


});
