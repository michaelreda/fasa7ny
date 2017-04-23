myapp.controller('serviceProviderPageController', function($scope,serviceProviderSRV) {

  $scope.submitComplain = function(){
      var complainBody = $scope.complainBody;
    serviceProviderSRV.submitComplain(complainBody).success(function(){
      console.log("subscribed to service provider succesfully");
    })
  }
});
