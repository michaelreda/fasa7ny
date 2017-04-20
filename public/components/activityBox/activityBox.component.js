angular.module('myapp').
component('activityBox',{
  templateUrl:'components/activityBox/activityBox.template.html',
  controller: function ActivityBoxController($scope,$state,userSRV){
      $scope.openActivity = function(activityID){
        $state.go("activity",{activityID:activityID})
      },
      $scope.addToWishList = function(activityId){
        userSRV.addToWishList(activityId).success(function(){
          console.log("added to wish list");
        })
      }
  },
   bindings: {
     data: '='
   }
})
