myapp.controller('BookingController', function($scope,$stateParams,activitySRV) {

//getting activity
  if($stateParams.activityID != undefined){
      activitySRV.getActivityById($stateParams.activityID)
      .success(function(data){
        $scope.activity=data;
        $scope.media=data.activity.media;
      })
  }

});
