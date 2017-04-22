myapp.factory('addActivitySRV', function($http){
  return{
    addActivity:function(title,type,durationInMinutes,
                    minClientNumber,maxClientNumber,minAge,maxAge,theme,prices){
        return $http.post('/add_activity');
      },
  }
})
