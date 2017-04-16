myapp.controller('ActivityController', function($scope,$rootScope,$stateParams,activitySRV) {

  if($stateParams.activityID != undefined){
      activitySRV.getActivityById($stateParams.activityID)
      .success(function(data){
        $scope.activity=data;
        $rootScope.media=data.activity.media;
        console.log($scope.activity);
        console.log($rootScope.media);

      })
  }
});
