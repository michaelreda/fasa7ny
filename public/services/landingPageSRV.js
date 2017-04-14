myapp.factory('landingPageSRV', function($http) {
  return {
    getStatistics: function() {
      return $http.get('/get_statistics')
    },
      getNearbyActivities: function(lat,long) {
        return $http.post('/get_nearby_activities',{'lat':lat,'long':long});
    }
  };
});
