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
    }
  };
});
