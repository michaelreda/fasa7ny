myapp.factory('adminSRV', function($http) {
  return {
    viewServiceProviderRequests: function() {
      return $http.get('/view_sp_requests');
    }
  };
});
