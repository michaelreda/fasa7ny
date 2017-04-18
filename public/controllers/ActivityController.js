myapp.controller('ActivityController', function($scope,$stateParams,activitySRV) {

//getting activity
  if($stateParams.activityID != undefined){
      activitySRV.getActivityById($stateParams.activityID)
      .success(function(data){
        $scope.activity=data;
        $scope.media=data.activity.media;
      })
  }


//rating and reviewing activity
  $scope.rateReviewActivity = function(){
      console.log($scope.reviewObj);
  }
});
