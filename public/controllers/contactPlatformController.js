
myapp.controller('contactPlatformController', function($scope,contactPlatformSRV) {
    $state.switchView=function(){
      $state.go("contactPlatform");
    }

    contactPlatformSRV.contactPlatform($scope.contactPlatform).success(function(data){
      //$scope.emptybox.value=data.isOK;
      //console.log($scope.emptybox);

      $scope.contactPlatform= function(message){
        if(message==undefined || message==''  )
          message='_'
        console.log(message);
        //$state.transitionTo('/activities', {searchInput:searchInput});
        $state.go("home", {message:message});
        clearInterval(timer);//stop shuffling images
      };
    })

});
