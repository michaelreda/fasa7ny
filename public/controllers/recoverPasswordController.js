myapp.controller('recoverPasswordController', function($scope, recoverPasswordSRV, $state){
  $scope.recover=function(userName){
    if(userName==undefined){
      recoverPasswordSRV.recover(userName).success(function(){
        console.log("No username");
        $state.go("recoverPassword");
        toastr.warning('No username is entered');
      })
    }
    else{
      recoverPasswordSRV.recover(userName).success(function(){
        console.log("recovered");
        $state.go("home");
        toastr.success('An e-mail was sent with your new password :) Please log in again');
      })
    }
  }
});

//handle exceptions
