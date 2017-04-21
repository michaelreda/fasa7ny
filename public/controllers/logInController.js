myapp.controller('logInController', function($window,$scope,logInSRV, $state,$uibModal){

  $scope.logIn = function () {
    logInSRV.login($scope.u, $scope.p).success(function(data){
      if(!data.userAccount){
        console.log('Not logged in :((  look at logincontroller');
      }
      else {
        $window.localStorage['userAccount'] = angular.toJson(data.userAccount);
      if(data.type==0){
        $state.go("userPage");
        $window.localStorage['userProfile'] = angular.toJson(data.userProfile);
      }
      if(data.type==1){
        $state.go("spPage");
        $window.localStorage['spProfile'] = angular.toJson(data.spProfile);
      }
      if(data.type==3){
        $state.go("admin");
        $window.localStorage['adminProfile'] = angular.toJson(data.adminProfile);
      }
    }
    });
  }

  $scope.loginModal = function(){
    $uibModal.open({
      templateUrl: 'loginModal.html',
      controller: 'loginModalController',
    })
    .result.then(
      function () {
      //  alert("OK");
      },
      function () {
      //  alert("Cancel");
      }
    );
  }

})

.controller("loginModalController", function ($uibModalInstance,$window,$scope,logInSRV, $state,activitySRV) {
  $scope.selectedUsername = undefined;
  activitySRV.getUsernames().success(function(data){
      $scope.usernames =[];
      for(var i=0;i<data.usernames.length;i++){
        $scope.usernames[i] = data.usernames[i].userName;
      }
      console.log($scope.usernames);
  })
  $scope.ok = function () {
    alert($scope.selectedUsername);
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
