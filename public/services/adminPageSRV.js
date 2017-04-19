myapp.factory('adminPageSRV', function($http) {
  return{
  viewLogs:function(){
    return $http.get('/view_system_logs/');

  }
};

});
