myapp.controller('serviceProvidersForUserController', function($scope,$state,serviceProvidersSRV) {

        serviceProvidersSRV.viewAllServiceProviders().success(function(data){
            $scope.serviceProviders=data;
            console.log($scope.serviceProviders);
        })


        $scope.openServiceProvider= function(serviceProviderId){
          $state.go("service provider", {serviceProviderId:serviceProviderId});
        }
});
