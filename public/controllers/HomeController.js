myapp.controller('HomeController', function($scope,landingPageSRV) {
    //getting latest reviews
    landingPageSRV.getLatest6Reviews().success(function(data){
      $scope.reviews=data.reviews;
      $scope.reviewsCount=data.reviewsCount;
      console.log($scope.reviews);
    })
});
