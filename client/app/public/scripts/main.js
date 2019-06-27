var app = angular.module('adminApp', ['ui.router', 'ngStorage', 'angularGrid']).config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('user', {
            abstract: true,
            url: '/user',
            templateUrl: '/views/main.html'
        }).state('user.editProfile', {
            url: '/editProfile',
            templateUrl: '/views/editProfile.html',
            restrictions: {
                ensureAuthenticated: true,
                loginRedirect: false
                }
        })
        .state('user.feed', {
            url: '/feed',
            controller: 'demo',
            templateUrl: '/views/feed.html',
            restrictions: {
                ensureAuthenticated: true,
                loginRedirect: false
                }
        }).state('login', {
            url: '/login',
            templateUrl: '/views/login.html',
            controller: 'authLoginCtrl'
        }).state('signup', {
            url: '/signup',
            templateUrl: '/views/signup.html',
            controller: 'authRegisterCtrl'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('photography', {
            url: '/photography',
            controller: 'demo',
            templateUrl: '/views/photography.html'     
        });


function routeStart($rootScope, $location, $route) {
  $rootScope.$on('$routeChangeStart', (event, next, current) => {
    if (next.restrictions.ensureAuthenticated) {
      if (!localStorage.getItem('token')) {
        $location.path('/login');
      }
    }
    if (next.restrictions.loginRedirect) {
      if (localStorage.getItem('token')) {
        $location.path('/status');
      }
    }
  });
}
    })


.service('imageService', ['$q','$http', function($q,$http){
    this.loadImages = function(){
        return [{
            image: "/imgs/urban.jpg", info: "blah blahg blah", artist: 'Spre'
        }, {
            image: "/imgs/centaurBeatsImg2.jpg", info: "blah blahg blah", artist: 'Spre'
        }];
    };
}])
.controller('demo', ['$scope','imageService','angularGridInstance', function ($scope,imageService,angularGridInstance) {

       $scope.pics = imageService.loadImages();
  
    $scope.refresh = function(){
        angularGridInstance.gallery.refresh();
    }
}]);

