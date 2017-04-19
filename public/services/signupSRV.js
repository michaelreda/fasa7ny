myapp.factory('signupSRV',function ($http) {
  return{
    sendAccountDetails:function() {
      return $http.post('/signup',{});
    },

    sendUserProfileDetails:function() {
      return $http.post('/signup_user',{});
    },

    sendServiceProviderProfileDetails:function() {
      return $http.post('/signup_sp',{});
    }

  }
});
