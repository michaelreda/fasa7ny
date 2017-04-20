angular.module('myapp').
component('activityBox',{
  templateUrl:'components/activityBox/activityBox.template.html',
  controller: function ActivityBoxController($scope,$state, $uibModal){
      $scope.openActivity = function(activityID){
        $state.go("activity",{activityID:activityID})
      }

      $scope.openBookingPage= function(activityID){
        $state.go("booking",{activityID:activityID})
      }
      $scope.showSendGiftModal = function(){
        $uibModal.open({
          templateUrl: 'sendGiftModal.html',
          controller: 'sendGiftModalController',
        })
        .result.then(
          function () {
          //  alert("OK");
          },
          function () {
          //  alert("Cancel");
          }
        );
      }

  },
   bindings: {
     data: '='
   }
})

.controller("sendGiftModalController", function ($scope, $uibModalInstance,activitySRV) {
  $scope.selectedUsername = undefined;
  activitySRV.getUsernames().success(function(data){
      $scope.usernames =[];
      for(var i=0;i<data.usernames.length;i++){
        $scope.usernames[i] = data.usernames[i].userName;
      }
      console.log($scope.usernames);
  })
  $scope.ok = function () {
    alert($scope.selectedUsername);
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

.filter('contains', function() { //checks if selected userName is in usernames array
  return function (array, needle) {
    if(needle != undefined)
      return array.indexOf(needle) >= 0;
    return -1;
  };
});
