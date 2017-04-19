myapp.controller('adminPageController', function($scope,adminPageSRV){
  adminPageSRV.viewSystemLogs().success(function(data){
    $scope.logs=data.log;
    console.log($scope.logs);
  })
})
