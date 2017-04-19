var myapp= angular.module("myapp", ['ui.router','geolocation','yaru22.angular-timeago','angular-flexslider','star-rating']);

myapp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
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

  $stateProvider.state({
    name:'home',
    url:'/',
    templateUrl:'views/home.view.html',
    controller:'HomeController'
  });

  $stateProvider.state({
    name:'register',
    url:'/signup',
    templateUrl:'views/createAccount.view.html',
    //controller:'Controller'
  });

  $stateProvider.state({
    name:'logIn',
    url:'/login',
    templateUrl:'views/loginPage.view.html',
    controller:'logInController'
  });

  $stateProvider.state({
    name:'contactPlatform',
    url:'/contact_platform',
    templateUrl:'views/contactPlatform.view.html',
    controller:'contactPlatformController'
  });

  $stateProvider.state({
    name:'userPage',
    url:'/user',
    templateUrl:'views/userPage.view.html',
    controller:'userPageController'
  });

  $stateProvider.state({
    name:'spPage',
    url:'/serviceProvider',
    templateUrl:'views/serviceProviderPage.view.html',
    controller:'serviceProviderPageController'
  });

  $stateProvider.state({
    name:'admin',
    url:'/admin',
    templateUrl:'views/adminPage.view.html',
    controller:'adminPageController'
  });

  $stateProvider.state({
    name:'systemLogs',
    url:'/view_system_logs',
    templateUrl:'views/adminPage.view.html',
    controller:'adminPageController'
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
