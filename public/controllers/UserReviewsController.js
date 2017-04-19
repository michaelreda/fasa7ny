myapp.controller('UserReviewsController', function($scope,userSRV) {

  userSRV.viewReviews().success(function(data){
    console.log(data);
    $scope.reviewEditable= new Array(data.length).fill(false);
    $scope.reviews= data;
  });

  $scope.enableUpdateReview = function(i){
    document.getElementById("review_"+i).setAttribute("contenteditable", "true");
    document.getElementById("review_"+i).focus();
    $scope.reviewEditable[i]=true;
  }
});
