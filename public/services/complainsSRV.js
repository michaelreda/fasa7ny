myapp.factory('complainsSRV', function($http) {
  return {
    viewComplains: function() {
      return $http.get('/view_complains');
    },
    deletecomplain:function(id){
      return $http.post('/remove_complain',{complainId:id});
    },
    ChangeIsSeen:function(id){
      return $http.post('/update_isSeen',{complainId:id});
    }
  };
});