myapp.factory('userSRV', function($http) {
  return {
    viewReviews: function() {
      return $http.get('/view_my_reviews');
    }
  };
});
