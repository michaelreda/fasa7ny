var myapp= angular.module("myapp", ['ui.router','geolocation','yaru22.angular-timeago','angular-flexslider','star-rating','ui.bootstrap']);

myapp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $stateProvider.state({
    name:'home',
    cache:false,
    url:'/',
    templateUrl:'views/home.view.html',
    controller:'HomeController'
  });

  $stateProvider.state({
    name:'activities',
    cache:false,
    url:'/activities/:searchInput/:day/',
    templateUrl:'views/activities.view.html',
    controller:'ActivitiesController'
  });

  $stateProvider.state({
    name:'activity',
    cache:false,
    url:'/activity/:activityID',
    templateUrl:'views/activity.view.html',
    controller:'ActivityController'
  });

  $stateProvider.state({
    name:'userReviews',
    url:'/my_reviews',
    cache:false,
    templateUrl:'views/userReviews.view.html',
    controller:'UserReviewsController'
  });

  $stateProvider.state({
    name:'userBookings',
    cache:false,
    url:'/my_bookings/:userID',
    templateUrl:'views/userBookings.view.html',
    controller:'UserBookingsController'
  });
  $stateProvider.state({
    name:'booking',
    cache:false,
    url:'/booking/:activityID',
    templateUrl:'views/booking.view.html',
    controller:'BookingController'

  });
  $stateProvider.state({
     name:'logIn',
     cache:false,
     url:'/login',
     templateUrl:'views/loginPage.view.html',
     controller:'logInController'
   });

   $stateProvider.state({
     name:'contactPlatform',
     cache:false,
     url:'/contact_platform',
     templateUrl:'views/contactPlatform.view.html',
     controller:'contactPlatformController'
   });

   $stateProvider.state({
     name:'userPage',
     cache:false,
     url:'/user',
     templateUrl:'views/userPage.view.html',
     controller:'userPageController'
   });

   $stateProvider.state({
     name:'spPage',
     cache:false,
     url:'/serviceProvider',
     templateUrl:'views/serviceProviderPage.view.html',
     controller:'serviceProviderPageController'
   });

   $stateProvider.state({
     name:'admin',
     cache:false,
     url:'/admin',
     templateUrl:'views/adminPage.view.html',
     controller:'adminPageController'
   });

   $stateProvider.state({
     name:'systemLogs',
     cache:false,
     url:'/view_system_logs',
     templateUrl:'views/systemLogs.view.html',
     controller:'systemLogsController'
      });

   $stateProvider.state({
     name:'signupLocal',
     cache:false,
     url:'/signup',
     templateUrl:'views/signup.view.html',
     controller:'signupController'
  });


  $stateProvider.state({
    name:'newsletter',
    cache:false,
    url:'/newsletter',
    templateUrl:'views/home.view.html',
    controller:'NewsLetterController'
  });
   $stateProvider.state({
     name: 'FAQ',
     cache:false,
     url: '/FAQ',
     templateUrl:'views/FAQ.view.html',
     controller: 'FAQController'
   });


   $stateProvider.state({
     name: 'service provider',
     cache:false,
     url: '/serviceProvider',
     templateUrl:'views/serviceProvider.view.html',
     controller: 'SPController'
   });

  $stateProvider.state({
    name:'aboutUs',
     cache:false,
    url:'/aboutUs',
    templateUrl:'views/aboutUs.view.html'
  });

  $stateProvider.state({
    name:'buttons',
     cache:false,
    url:'/buttons',
    templateUrl:'views/buttons.view.html',
    controller:'buttonsController'
  });

  $stateProvider.state({
    name:'analysis',
     cache:false,
    url:'/adminAnalysis',
    templateUrl:'views/analysis.view.html',
    controller:'analysisController'
  });

   $stateProvider.state({
    name:'chats',
    url:'/chats',
    templateUrl:'views/chat.view.html',
    controller:'ChatController'
  });

    $stateProvider.state({
    name:'filteredActivities',
     cache:false,
    url:'/filteredActivities/:filter/:value/',
    templateUrl:'views/activities.view.html',
    controller:'ActivitiesController'
  });


    $stateProvider.state({
    name: 'service providers',
    url: '/serviceProviders',
    templateUrl:'views/serviceProviders.view.html',
    controller: 'serviceProvidersForUserController'
  });

      $stateProvider.state({
    name:'compare',
    url:'/comparison',
     cache:false,
    templateUrl:'views/compare.view.html',
    controller:'compareController'
  });

   $stateProvider.state({
    name:'adminComplainPanel',
    url:'/complains',
     cache:false,
    templateUrl:'views/complains.view.html',
    controller:'complainsController'
  });

  $stateProvider.state({
    name:'message',
    url:'/message/:messageId',
    cache:false,
    templateUrl:'views/message.view.html',
    controller:'MessageController'
  });

  $stateProvider.state({
    name:'offers_form',
    url:'/offers_form',
    cache:false,
    templateUrl:'views/offers_form.view.html',
    controller: 'OffersController'
  });

    $stateProvider.state({
    name:'offers',
    url:'/offers/:title/:description/:deadline/:isActive/:activities',
    templateUrl:'views/offers.view.html',
    cache:false,
    controller:'OffersController'
  });

   $stateProvider.state({
    name:'birthdayClients',
    cache:false,
    url:'/birthdayClients',
    cache:false,
    templateUrl:'views/birthdayClients.view.html',
    controller:'PromotionsController'
  });

   $stateProvider.state({
    name:'holdingReservations',
    cache:false,
    url:'/holdingReservations',
    cache:false,
    templateUrl:'views/holdingReservations.view.html',
    controller:'holdingReservationsController'
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
