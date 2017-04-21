myapp.controller('adminPageController', function($scope,adminPageSRV, $state){

  adminPageSRV.deleteLog().success(function(){
    console.log("Deletion is successfull");
    $state.go('admin');
    toastr.success('All logs are deleted successfully');
  })

});
