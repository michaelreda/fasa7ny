myapp.factory('activitySRV', function($http) {
  return {
    getActivityById: function(activityID) {
      return $http.get('/get_activity_by_id/'+activityID+'/');
    },
    getUsernames:function(){
      return $http.get('/view_usernames');
    },
    getActivityReviews:function(activityID){
      return $http.post('/get_activity_reviews',{activityID});
    },
    rateReviewActivity:function(activityId,review,inputRating,rating,ratingCount){
      return $http.post('/ratereview_activity',{activityId:activityId,inputRating:inputRating,review:review,rating:rating,ratingCount:ratingCount});
    }
  };
});
