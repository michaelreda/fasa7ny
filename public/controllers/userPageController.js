myapp.controller('userPageController', function($scope,userSRV) {
    var self=this;
    self.privacyLevel=0;


  $scope.changePrivacy= function(privacyLevel){
    self.privacyLevel=privacyLevel;
    userSRV.changePrivacy(privacyLevel).success(function(){
        console.log('changed privacy');
    })
  }
});
