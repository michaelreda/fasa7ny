myapp.controller('complainsController', function($scope,complainsSRV) {
  complainsSRV.viewComplains().success(function(data){
      console.log(data);
    $scope.complains= data;
  });


 $scope.delete= function(i){
    var id= $scope.complains[i]._id;
    complainsSRV.deletecomplain(id).success(function(){
      document.getElementById("row_"+i).remove();
      toastr.success('Review deleted succesfully');
      
    })
  };

  

   $scope.isSeen= function(i){
    var id= $scope.complains[i]._id;
    complainsSRV.ChangeIsSeen(id).success(function(){
      toastr.success('Review is seen status updated succesfully');
      $route.reload();
    })
  };

 

});
