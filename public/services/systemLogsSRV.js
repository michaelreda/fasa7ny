myapp.factory('systemLogsSRV', function($http) {
  return{
  viewLogs:function(){
    return $http.get('/view_system_logs/');

  }
};

});
