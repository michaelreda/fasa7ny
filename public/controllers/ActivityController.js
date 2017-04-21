myapp.controller('ActivityController', function($scope,$stateParams,activitySRV) {
  $scope.Math= Math;
//getting activity
  if($stateParams.activityID != undefined){
      activitySRV.getActivityById($stateParams.activityID)
      .success(function(data){
        $scope.activity=data.activity;
        console.log($scope.activity);
        $scope.media=data.activity.media;
      })
  }

  var rate=0;

//rating and reviewing activity
  $scope.rateReviewActivity = function(){
      console.log($scope.reviewObj);
      console.log(rate);
  }
  $scope.rateChanged = function($event){
    rate=$event.rating;
  }
});
