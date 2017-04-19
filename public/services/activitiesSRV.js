myapp.factory('activitiesSRV', function($http) {
  return {
    search: function(searchInput,day) {
      return $http.get('/search_for_activities/'+searchInput+'/'+day+'/');
    },
    filter: function(filter,value){
      return $http.get('/get_filtered_activities/'+filter+'/'+value+'/')
    }

  };
});
