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
  };

  $scope.cancelEditing = function(i){
    document.getElementById("review_"+i).setAttribute("contenteditable", "false");
    var $review_block = $("#review_"+i).html($scope.reviews[i].review);
    $scope.reviewEditable[i]=false;
  };

});
