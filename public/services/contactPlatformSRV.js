myapp.factory('contactPlatformSRV', function($http) {
  return {
    contactPlatform: function(msg) {
        return $http.post('/contact_platform',{'message':msg});
    }
  };
});
