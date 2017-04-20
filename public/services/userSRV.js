myapp.factory('userSRV', function($http) {
  return {
    viewReviews: function() {
      return $http.get('/view_my_reviews');
    },
    updateReview:function(id,review){
      return $http.post('/update_review',{activityId:id,review:review});
    }
  };
});
