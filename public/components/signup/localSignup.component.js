angular.module('myapp').
  component('localSignup',{
    templateUrl:'components/signup/localSignup.template.html',
    controller: function localSignupController($scope,$state,signupSRV){
      var self = this;
      $scope.signupStepOne = function() {
       signupSRV.sendAccountDetails({'userName':this.userName,'password':this.password,'email':this.email,'type':this.type}).success();
      }

    }
});
