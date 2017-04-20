angular.module('myapp').
  component('localsignup',{
    templateUrl:'components/signup/localsignup.template.html',
    controller: function localSignupController($window,$scope,$state,signupSRV){
      var self = this;
      this.signupStepOne = function() {
       signupSRV.sendAccountDetails($scope.userName,$scope.password,$scope.email,$scope.type==undefined? 0:$scope.type).success(function(data) {
         if(data.stepOneOK){
         $window.localStorage['userAccount'] = angular.toJson(data.userAccount);
         $state.go('home');
       }
       });
      }

    }
});
