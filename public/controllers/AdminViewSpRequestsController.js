myapp.controller('AdminViewSpRequestsController', function($scope,adminSRV) {
  adminSRV.viewServiceProviderRequests().success(function(data){
    $scope.reviewEditable= new Array(data.length).fill(false);
    $scope.requests= data;
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
    toastr.info('Review update cancelled');
  };

  $scope.update= function(i){
    var review = document.getElementById("review_"+i).innerHTML;
    var id= $scope.reviews[i]._id;
    userSRV.updateReview(id,review).success(function(){
      $scope.reviews[i].review=review;
      document.getElementById("review_"+i).setAttribute("contenteditable", "false");
      var $review_block = $("#review_"+i).html($scope.reviews[i].review);
      $scope.reviewEditable[i]=false;
      toastr.success('Review updated succesfully');
    })
  }

  $scope.refuse= function(i){
    var id= $scope.reviews[i]._id;
    userSRV.deleteReview(id).success(function(){
      document.getElementById("row_"+i).remove();
      toastr.success('Request refused');
    })
  }

});
