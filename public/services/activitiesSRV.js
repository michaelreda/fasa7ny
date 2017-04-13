myapp.factory('activitiesSRV', function($http) {
  return {
    search: function(searchInput,day) {
      return $http.get('/search_for_activities/'+searchInput+'/'+day+'/');
    }
  };
});
