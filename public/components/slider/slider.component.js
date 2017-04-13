angular.module('myapp').
  component('slider',{
    templateUrl:'components/slider/slider.template.html',
    controller: function SliderController($http){
      this.test="AngularJS";
    }
});
