myapp.factory('landingPageSRV', function($http) {
  return {
    getStatistics: function() {
      return $http.get('/get_statistics').success(function(data){
      })
    }
  };
});
