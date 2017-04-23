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
    name:'chats',
    url:'/chats',
    templateUrl:'views/chat.view.html',
    controller:'ChatController'
  });

  $stateProvider.state({
    name:'message',
    url:'/message/:messageId',
    templateUrl:'views/message.view.html',
    controller:'MessageController'
  });

  $stateProvider.state({
    name:'offers_form',
    url:'/offers_form',
    templateUrl:'views/offers_form.view.html',
    controller: 'OffersController'
  });

    $stateProvider.state({
    name:'offers',
    url:'/offers/:title/:description/:deadline/:isActive/:activities',
    templateUrl:'views/offers.view.html',
    controller:'OffersController'
  });

   $stateProvider.state({
    name:'birthdayClients',
    url:'/birthdayClients',
    templateUrl:'views/birthdayClients.view.html',
    controller:'PromotionsController'
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
