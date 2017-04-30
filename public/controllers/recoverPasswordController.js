myapp.controller('recoverPasswordController', function($scope, recoverPasswordSRV, $state){
  $scope.recover=function(userName){
    if(userName==undefined){
      recoverPasswordSRV.recover(userName).success(function(){
        $state.go("recoverPassword");
        toastr.warning('No username is entered');
      })
    }
    else{
      recoverPasswordSRV.recover(userName).success(function(){
        $state.go("home");
        toastr.success('An e-mail was sent with your new password :)Please log in again');
      })
    }
  }
})
