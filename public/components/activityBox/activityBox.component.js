angular.module('myapp').
component('activityBox',{
  templateUrl:'components/activityBox/activityBox.template.html',
  controller: function ActivityBoxController($scope,$state){
      $scope.openActivity = function(activityID){
        $state.go("activity",{activityID:activityID})
      }
  },
   bindings: {
     data: '='
   }
})
