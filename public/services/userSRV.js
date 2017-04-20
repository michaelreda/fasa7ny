myapp.factory('userSRV', function($http) {
  return {
    viewReviews: function() {
      return $http.get('/view_my_reviews');
    },
    updateReview:function(id,review){
      return $http.post('/update_review',{reviewId:id,review:review});
    },
    deleteReview:function(id){
      return $http.post('/delete_review',{reviewId:id});
    }
  };
});
