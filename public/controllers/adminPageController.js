myapp.controller('adminPageController', function($scope,adminPageSRV){
  adminPageSRV.viewLogs().success(function(data){
    $scope.logs=data.log;
    console.log($scope.logs);
  })
});
