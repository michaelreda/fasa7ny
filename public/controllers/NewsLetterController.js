myapp.controller('NewsLetterController', function($scope, newsLetterSRV){
$scope.subscribe=function(){
  newsLetterSRV.signUpForNewsletter($scope.mail).success(function(){
    //toastr.success('Successfull subscription for newsletter');
    console.log("newsletter");
  })
}

});
