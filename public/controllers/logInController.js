myapp.controller('logInController', function($scope,logInSRV, $state){
  logInSRV.local-login(userName, password).success(function(data){
    console.log("da5al");
    if(data==0){
      $state.go("userPage");
    }
    if(data==1){
      $state.go("spPage");
    }
    if(data==3){
      $state.go("admin");
    }
  });

});
