myapp.controller('serviceProvidersForUserController', function($scope,$state,serviceProvidersSRV) {

//   if($stateParams.searchInput != undefined || $stateParams.day != undefined){
//       loaderSRV.start();
//       activitiesSRV.search($stateParams.searchInput,$stateParams.day)
//       .success(function(data){
//         $scope.activities=data;
//         loaderSRV.end();
//       })
//   }

    $scope.viewAllServiceProviders= function(){
        serviceProvidersSRV.viewAllServiceProviders().success(function(data){
            $scope.serviceProviders=data;
        })
    },

  $scope.openServiceProvider= function(serviceProviderId){
    $state.go("service provider", {serviceProviderId:serviceProviderId});
  }
});

