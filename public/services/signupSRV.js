myapp.factory('signupSRV',function ($http) {
  return{
    sendAccountDetails:function(userName,password,email,type) {
      return $http.post('/signup',{'userName':userName,'password':password,'email':email,'type':type});
    },

    sendUserProfileDetails:function() {
      return $http.post('/signup_user',{});
    },

    sendServiceProviderProfileDetails:function() {
      return $http.post('/signup_sp',{});
    }

  }
});
