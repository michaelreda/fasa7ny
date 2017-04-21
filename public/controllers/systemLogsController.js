myapp.controller('systemLogsController', function($scope,systemLogsSRV){
  systemLogsSRV.viewLogs().success(function(data){
    $scope.logs=data.log;
    console.log($scope.logs);
  })

});
