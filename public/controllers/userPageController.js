myapp.controller('userPageController', function($scope,userSRV,$window,$state) {
    var self=this;
    self.privacyLevel=0;

    $scope.editInfoBtnTxt="Edit Info";
    $scope.userProfile=JSON.parse($window.localStorage['userProfile']);

    $scope.editInfo = function(){
      if($scope.editInfoBtnTxt=="Edit Info"){
        $scope.editInfoBtnTxt = "update profile";
        document.getElementById("mobileNumber").setAttribute("contenteditable", "true");
        document.getElementById("mobileNumber").focus();

        document.getElementById("profession").setAttribute("contenteditable", "true");
        document.getElementById("profession").focus();
      }else{
        var mobileNumber= document.getElementById("mobileNumber").innerHTML;
        document.getElementById("mobileNumber").setAttribute("contenteditable", "false");

        var profession= document.getElementById("profession").innerHTML;
        document.getElementById("profession").setAttribute("contenteditable", "false");

        $scope.editInfoBtnTxt = "Edit Info";

        userSRV.updateProfile(mobileNumber,profession).success(function(){
          toastr.success('profile updated successfully');
          $state.go('userPage');
        })
      }
    }

  $scope.changePrivacy= function(privacyLevel){
    self.privacyLevel=privacyLevel;
    userSRV.changePrivacy(privacyLevel).success(function(){
        toastr.success('privacy changed');
    })
  }
});
