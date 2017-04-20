myapp.controller('BookingController', function($scope,$stateParams,activitySRV,$window) {
var self = this;
$scope.Math=Math;
//getting activity
  if($stateParams.activityID != undefined){
      activitySRV.getActivityById($stateParams.activityID)
      .success(function(data){
        $scope.activity=data.activity;
        self.activity=data.activity;
      })
  }



  //istantiating variable for views
  $scope.active=new Array(3).fill("");
  $scope.disabled=new Array(3).fill("disabled");
  $scope.completed=new Array(3).fill("");
  $scope.active[0]="active";
  $scope.disabled[0]="";

  $scope.dateOptions = {
    minDate: new Date(),
    dateDisabled: disabled,
    showWeeks:false
  };

  function disabled (data) {
    var result= false;
    var date = data.date,
    mode = data.mode;
    days=$window.localStorage['days'];
    days=days.split(',').map(Number);

      for(var i=0;i<days.length;i++){
        if(days[i]!=-1){
          result |=  date.getDay() == i;
        }
      }
      result &= mode === 'day';
      return result;
  }


$scope.$watch('activityDate',function(newVal, oldVal, scope){
    if(newVal != oldVal){
         scope.activityDate = newVal;
         console.log(newVal.getDay());
     }
},true);

$scope.chosenTime= function(time){
  $scope.time=time;
}

$scope.submitTiming = function(){
  if($scope.time== undefined)
    toastr.error("please select a timing to proceed");
  else{
  console.log($scope.time);
  $scope.completed[0]="completed";
  $scope.active[0]="";
  $scope.active[1]="active";
  $scope.disabled[1]="";
}
}

  // $scope.$watch('activity', function (activity,oldValue) {
  //   if(activity!= undefined){
  //     console.log(disabled);
  //     $scope.dateOptions.dateDisabled=disabled;
  //     console.log($scope.dateOptions);
  //     }
  // }, true);

});
