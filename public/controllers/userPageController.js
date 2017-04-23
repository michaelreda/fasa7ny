myapp.controller('userPageController', function($scope,userSRV,$window) {
    var self=this;
    self.privacyLevel=0;

    $scope.userProfile=JSON.parse($window.localStorage['userProfile']);

  $scope.changePrivacy= function(privacyLevel){
    self.privacyLevel=privacyLevel;
    userSRV.changePrivacy(privacyLevel).success(function(){
        toastr.success('privacy changed');
    })
  }
});
