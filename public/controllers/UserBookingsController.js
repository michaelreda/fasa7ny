myapp.controller('UserBookingsController', function($scope,userSRV) {
  userSRV.viewHistoryBookings().success(function(data){
  
    $scope.reviews= data;
  });

});
