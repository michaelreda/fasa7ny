angular.module('myapp').
  component('localsignup',{
    templateUrl:'components/signup/localsignup.template.html',
    controller: function localSignupController($state,signupSRV){
      var self = this;
        this.toot='yesssss';
      this.signupStepOne = function() {
        throw new Error('yuyu');
       signupSRV.sendAccountDetails({'userName':this.userName,'password':this.password,'email':this.email,'type':this.type}).success();
      }

    }
});
