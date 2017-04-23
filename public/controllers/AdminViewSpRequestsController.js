myapp.controller('AdminViewSpRequestsController', function($scope,adminSRV) {
  adminSRV.viewServiceProviderRequests().success(function(data){
    $scope.reviewEditable= new Array(data.length).fill(false);
    $scope.requests= data;
  });

  $scope.accept= function(i){
    var id= $scope.requests[i]._id;
    adminSRV.acceptServiceProviderRequests(id).success(function(){
      toastr.success('service provider request accepted');
      $state.go('viewSPrequests');
    })
  }

  $scope.refuse= function(i){
    var id= $scope.requests[i]._id;
    adminSRV.rejectServiceProviderRequests(id).success(function(){
      toastr.success('service provider request rejjected');
      $state.go('viewSPrequests');
    })
  }

});
