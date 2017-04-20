myapp.factory('ButtonsSRV', function($http) {
  return {
    applyGoldenSp: function() {
      return $http.get('/apply_to_golden')
    }
  };
});