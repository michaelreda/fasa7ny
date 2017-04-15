myapp.factory('activitySRV', function($http) {
  return {
    getActivityById: function(activityID) {
      return $http.get('/get_activity_by_id/'+activityID+'/');
    }
  };
});
