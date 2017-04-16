angular.module('myapp').
component('activityBox',{
  templateUrl:'components/activityBox/activityBox.template.html',
  controller: function ActivityBoxController($state,$attrs){

  },
   bindings: {
     data: '='
   }
})
