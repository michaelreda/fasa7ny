angular.module('myapp').
  component('topSearchGif',{
    templateUrl:'components/topSearchGif/topSearchGif.template.html',
    controller: function TopSearchGifController($scope,$state){
        var self=this;
        self.day='_';
        self.value='_';
        self.filter='_';



        $scope.dayChosen=function(d){

          self.day=d;
        }

        $scope.search= function(searchInput){
          if(searchInput==undefined || searchInput==''  )
            searchInput='_'
          console.log(searchInput);
          //$state.transitionTo('/activities', {searchInput:searchInput});
          $state.go("activities", {searchInput:searchInput,day:self.day});
          clearInterval(timer);//stop shuffling images
        };


          $scope.valueChosen=function(value){
            console.log($scope.filter +" "+value);
             $state.go("filteredActivities",{filter:$scope.filter,value:value});
          //self.value=d;
        }

          $scope.filterChosen=function(d){
          $scope.filter=d;
          if(d=="offer")
          $state.go("filteredActivities",{filter:d});
        }





    }
});
