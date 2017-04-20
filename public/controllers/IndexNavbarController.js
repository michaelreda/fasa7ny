myapp.controller('IndexNavbarController',function($window,$scope,$state,landingPageSRV){

  $scope.logout = function(){
    landingPageSRV.logout().success(function(data){
      $scope.logoutOK=data.ok;
       $window.localStorage['userAccount']=undefined;
    })
  }

  $scope.isLoggedIn = function() {
    return $window.localStorage['userAccount']==undefined;
  }

  $scope.signupStatechange = function(){
    $state.go("signupLocal");
    }


});
