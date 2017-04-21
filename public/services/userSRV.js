myapp.factory('userSRV', function($http) {
  return {
    addToWishList: function(activityId) {
      return $http.post('/add_to_wishList',{activity:activityId});
    },

    subscribe: function(serviceProviderId){
      return $http.post('/subscibe', {serviceProviderId:serviceProviderId})
    },

    changePrivacy: function(privacyLevel){
      return $http.post('/change_privacy',{privacy:privacyLevel})
    },
    viewReviews: function() {
      return $http.get('/view_my_reviews');
    },
    updateReview:function(id,review){
      return $http.post('/update_review',{reviewId:id,review:review});
    },
    deleteReview:function(id){
      return $http.post('/delete_review',{reviewId:id});
    },
    userHistoryBookings:function(){
      return $http.post('/view_history_bookings');
    }
  };
});


  