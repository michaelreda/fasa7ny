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

  $stateProvider.state({
    name:'aboutUs',
    url:'/aboutUs',
    templateUrl:'views/aboutUs.view.html'
  });



  $stateProvider.state({
    name:'buttons',
    url:'/buttons',
    templateUrl:'views/buttons.view.html',
    controller:'buttonsController'
  });

  $stateProvider.state({
    name:'analysis',
    url:'/adminAnalysis',
    templateUrl:'views/analysis.view.html',
    controller:'analysisController'
  });

    $stateProvider.state({
    name:'filteredActivities',
    url:'/filteredActivities/:filter/:value/',
    templateUrl:'views/activities.view.html',
    controller:'ActivitiesController'
  });

      $stateProvider.state({
    name:'compare',
    url:'/comparison',
    templateUrl:'views/compare.view.html',
    controller:'compareController'
  });

   $stateProvider.state({
    name:'adminComplainPanel',
    url:'/complains',
    templateUrl:'views/complains.view.html',
    controller:'complainsController'
  });
  
   $stateProvider.state({
    name:'userReviews',
    url:'/my_reviews',
    templateUrl:'views/userReviews.view.html',
    controller:'UserReviewsController'
  });

  $stateProvider.state({
    name:'userBookings',
    url:'/my_bookings/:userID',
    templateUrl:'views/userBookings.view.html',
    controller:'UserBookingsController'
  });
  
  $stateProvider.state({
    name:'booking',
    url:'/booking/:activityID',
    templateUrl:'views/booking.view.html',
    controller:'BookingController'
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
   name:'newsletter',
   url:'/newsletter',
   templateUrl:'views/home.view.html',
   controller:'NewsLetterController'
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
    controller: 'SPsController'
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
