myapp.controller('BookingController', function($scope,$stateParams,activitySRV) {

//getting activity
  if($stateParams.activityID != undefined){
      activitySRV.getActivityById($stateParams.activityID)
      .success(function(data){
        $scope.activity=data;
      })
  }

  //istantiating variable for views
  $scope.active=new Array(3).fill("");
  $scope.disabled=new Array(3).fill("disabled");
  $scope.completed=new Array(3).fill("");
  $scope.active[0]="active";
  $scope.disabled[0]="";

});
