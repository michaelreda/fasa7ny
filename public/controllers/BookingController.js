myapp.controller('BookingController', function($scope,$stateParams,activitySRV,$window) {

//getting activity
  if($stateParams.activityID != undefined){
      activitySRV.getActivityById($stateParams.activityID)
      .success(function(data){
        $scope.activity=data.activity;

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
          console.log(result);
        }
      }
      result &= mode === 'day';
      return result;
  }

  // $scope.$watch('activity', function (activity,oldValue) {
  //   if(activity!= undefined){
  //     console.log(disabled);
  //     $scope.dateOptions.dateDisabled=disabled;
  //     console.log($scope.dateOptions);
  //     }
  // }, true);

});
