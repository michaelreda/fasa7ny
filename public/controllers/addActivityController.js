myapp.controller('addActivityController', function($scope, $state, activitySRV,$window){
  $scope.prices=[];
  $scope.$watch('LatLng', function (newval,oldval) {
    //alert(newval);
  },true);
  $scope.addActivity=function(){
    if($window.localStorage['spProfile'] == undefined){
      toastr.error("please login as sp");
      return;
    }

    var price =[];
    var numberOfClients=[];
    for(var i=0;i<10;i++){
      if(document.getElementById('price_'+i) !=undefined){
        price[i]=document.getElementById('price_'+i).value;
        numberOfClients[i]=document.getElementById('numberOfClients_'+i).value;
      }else{
        break;
      }
    }
    var prices=new Array();
    for(var i=0;i<price.length;i++){
      prices.push({
        price:price[i],
        numberOfClients: numberOfClients[i]
      });
    }


    activitySRV.addActivity($scope.title, $scope.type, $scope.durationInMinutes,$scope.minClientNumber,$scope.maxClientNumber,$scope.minAge,$scope.maxAge,$scope.theme,prices).success(function(){
      toastr.success('Activity added succcessfully');
    })
  }
});
