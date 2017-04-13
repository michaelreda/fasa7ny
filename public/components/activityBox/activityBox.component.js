angular.module('myapp').
component('activityBox',{
  templateUrl:'components/activityBox/activityBox.template.html',
  controller: function ActivityBoxController($state,$attrs){
    //data.stars=Math.round(data.rating)
    console.log("act: "+$attrs.activity);
  }
})
.directive('hello',function() {
  return {
    link: function (scope, element, attrs) {

      // get attrs value
      attrs.activity;

    }
  }});
