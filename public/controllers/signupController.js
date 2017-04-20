myapp.controller('signupController',function ($window,$scope,signupSRV) {

  $scope.isLoggedIn = function() {
    return !($window.localStorage['userAccount']==undefined);
  }

  $scope.isUser = function() {
    if(!($window.localStorage['userAccount']==undefined)){
      return JSON.parse($window.localStorage['userAccount']).type==0;

  }}

});
