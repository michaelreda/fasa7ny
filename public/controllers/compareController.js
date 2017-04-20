myapp.controller('compareController', function($scope,compareSRV,loaderSRV) {
    //getting latest reviews
    loaderSRV.start();
    compareSRV.getFirstList().success(function(data){
      console.log(data.ACs);
      console.log(data.SPs);
        $scope.Activities=data.ACs;
        $scope.serviceProviders=data.SPs;
        loaderSRV.end();
      
        
    });

    $scope.compareActivities=  function(selectedActivities,selectedActivities2){
        // $scope.selectedActivities
        compareSRV.compareActivities(selectedActivities,selectedActivities2).success(function(data){
            console.log(data)
        })
         console.log(selectedActivities)
         console.log(selectedActivities2)

    };


 $scope.compareServiceProvider=  function(selectedServiceProvider,selectedServiceProvider2){
        // $scope.selectedActivities
        // console.log($scope.selectedActivities)

        compareSRV.compareServiceProvider(selectedServiceProvider,selectedServiceProvider2).success(function(data){
            console.log(data)
        })
        console.log(selectedServiceProvider)
         console.log(selectedServiceProvider2)

    };
     

    

});