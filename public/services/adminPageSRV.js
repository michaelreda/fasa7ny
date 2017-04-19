myapp.factory('adminPageSRV', function($http) {
      return $http.get('/view_system_logs/');


});
