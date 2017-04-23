myapp.controller('serviceProvidersForUserController', function($scope,$state,serviceProvidersSRV) {

        serviceProvidersSRV.viewAllServiceProviders().success(function(data){
            $scope.serviceProviders=data;
        })

});
