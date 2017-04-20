myapp.controller('logInController', function($window,$scope,logInSRV, $state){

  $scope.logIn = function () {
    logInSRV.login($scope.u, $scope.p).success(function(data){
      if(!data.userAccount){
        console.log('Not logged in :((  look at logincontroller');
      }
      else {
        $window.localStorage['userAccount'] = angular.toJson(data.userAccount);
      if(data.type==0){
        $state.go("userPage");
      }
      if(data.type==1){
        $state.go("spPage");
      }
      if(data.type==3){
        $state.go("admin");
      }
    }
    });
  }
});
