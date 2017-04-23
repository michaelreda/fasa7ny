myapp.controller('serviceProviderController', function($scope,userSRV,serviceProviderSRV) {

  $scope.subscribe = function(serviceProviderId){
    userSRV.subscribe(serviceProviderId).success(function(){
      console.log("subscribed to service provider succesfully");
    })
  },
  $scope.submitComplain = function(){
      var complainBody = $scope.complainBody;
    serviceProviderSRV.submitComplain(complainBody).success(function(){
      console.log("subscribed to service provider succesfully");
    })
  }
});
