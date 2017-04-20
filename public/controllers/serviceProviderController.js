myapp.controller('serviceProviderController', function($scope,userSRV) {

  $scope.subscribe = function(serviceProviderId){
    userSRV.subscribe(serviceProviderId).success(function(){
      console.log("subscribed to service provider succesfully");
    })
  }
});
