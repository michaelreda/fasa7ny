var myapp= angular.module("myapp", ['ui.router','geolocation','yaru22.angular-timeago','angular-flexslider','star-rating','ui.bootstrap']);

myapp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $stateProvider.state({
    name:'home',
    url:'/',
    templateUrl:'views/home.view.html',
    controller:'HomeController'
  });

  $stateProvider.state({
    name:'activities',
    url:'/activities/:searchInput/:day/',
    templateUrl:'views/activities.view.html',
    controller:'ActivitiesController'
  });

  $stateProvider.state({
    name:'activity',
    url:'/activity/:activityID',
    templateUrl:'views/activity.view.html',
    controller:'ActivityController'
  });


  $urlRouterProvider.when('','/');

}]);

// myapp.config(function($routeProvider) {
//   $routeProvider
//   // route for the landingPage page
//     .when('/', {
//     templateUrl: 'index.html'
//
//   })
// })


// myapp.controller("SliderController", function($scope) {
//
// });
