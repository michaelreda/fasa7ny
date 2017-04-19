myapp.controller('analysisController', function($scope,analysisSRV) {
    //getting latest reviews
    analysisSRV.getAnalysis().success(function(data){
      
        $scope.topActivity=data.topActivity;
        $scope.topSP=data.topSP;
        $scope.topUser=data.topUser;
    })

    

});