myapp.factory('adminPageSRV', function($http) {
  return{
  deleteLog:function(){
    return $http.get('/delete_logs')
  },
}

});
