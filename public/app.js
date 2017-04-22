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
    templateUrl:'views/systemLogs.view.html',
    controller:'adminPageController'
     });

  $stateProvider.state({
    name:'signupLocal',
    url:'/signup',
    templateUrl:'views/signup.view.html',
    controller:'signupController'
 });
  $stateProvider.state({
    name: 'FAQ',
    url: '/FAQ',
    templateUrl:'views/FAQ.view.html',
    controller: 'FAQController'
  });

  $stateProvider.state({
    name: 'service providers',
    url: '/serviceProviders',
    templateUrl:'views/serviceProviders.view.html',
    controller: 'serviceProvidersForUserController'
  });

  $stateProvider.state({
    name: 'service provider',
    url: '/serviceProvider',
    templateUrl:'views/serviceProvider.view.html',
    controller: 'SPController'
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
