myapp.controller('UserReviewsController', function($scope,userSRV) {
  userSRV.viewWishList().success(function(data){
    $scope.wishList = data.wishList;
  });

  $scope.delete= function(i){
    var id= $scope.reviews[i]._id;
    userSRV.deleteReview(id).success(function(){
      document.getElementById("row_"+i).remove();
      toastr.success('Review deleted succesfully');
    })
  }

});
