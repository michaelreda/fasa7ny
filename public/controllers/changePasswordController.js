myapp.controller('changePasswordController',function($scope, changePasswordSRV, $state){
  $scope.changePassword=function(oldPassword,newPassword,confirmPassword){
    if(confirmPassword != newPassword){
      changePasswordSRV.changepassword(oldPassword,newPassword, confirmPassword).success(function(){
        console.log("different passwords");
        toastr.warning('Confirm password is not equal new password');
        $state.go("changePassword");
      })
    }
    else{
      if(newPassword.length<=6){
        changePasswordSRV.changepassword(oldPassword,newPassword,confirmPassword).success(function(){
          console.log("less than 6");
          $state.go("changePassword");
          toastr.warning('Password must contain at least 6 characters');
        })
      }
      else{
        changePasswordSRV.changepassword(oldPassword,newPassword,confirmPassword).success(function(){
          console.log("changed");
          $state.go("userPage");
          toastr.success('Password is successfully changed!');
        })
      }

    }

  }
});
