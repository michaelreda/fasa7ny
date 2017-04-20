myapp.controller('buttonsController', function($scope,ButtonsSRV) {
    //getting latest reviews
    
      $scope.applyGoldenSp= function(){
        console.log("2y neela")
        ButtonsSRV.applyGoldenSp().success(function(data){
      console.log(data);
    })
  }

   

});