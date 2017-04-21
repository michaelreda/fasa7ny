myapp.factory('serviceProviderSRV',function ($http) {
  return{
    submitComplain:function(complain) {
      return $http.post('/complain',{'complain': complain});
    },

    


  }
});
