
myapp.controller('contactPlatformController', function($scope,contactPlatformSRV) {
    contactPlatformSRV.contactPlatform("$scope.contactPlatform").success(function(data){
      //$scope.emptybox.value=data.isOK;
      console.log($scope.emptybox);
    })

});
