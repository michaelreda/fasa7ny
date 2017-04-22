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
             $scope.activity1=data.activity1;
              $scope.activity2=data.activity2;
        })
         console.log(selectedActivities)
         console.log(selectedActivities2)

    };


 $scope.compareServiceProvider=  function(selectedServiceProvider,selectedServiceProvider2){
        // $scope.selectedActivities
        // console.log($scope.selectedActivities)

        compareSRV.compareServiceProvider(selectedServiceProvider,selectedServiceProvider2).success(function(data){
            console.log(data)
            $scope.serviceProvider1=data.SP1;
              $scope.serviceProvider2=data.SP2;
        })
        console.log(selectedServiceProvider)
         console.log(selectedServiceProvider2)

    };
     

    

});