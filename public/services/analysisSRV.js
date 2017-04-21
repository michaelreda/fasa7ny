myapp.factory('analysisSRV', function($http) {
  return {
    getAnalysis: function() {
      return $http.get('/get_analysis')
    }
  };
});