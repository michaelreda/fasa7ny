myapp.controller('UserReviewsController', function($scope,userSRV) {
  $scope.counter=1;
  userSRV.viewReviews().success(function(data){
    console.log(data);
    $scope.reviews= data;
  });

});
