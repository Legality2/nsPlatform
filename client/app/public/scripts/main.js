var app = angular.module('adminApp', ['ui.router', 'ngStorage','ngResource', 'angularGrid', 'chart.js', 'ui.bootstrap']).config(function($stateProvider, $urlRouterProvider) {
    
    function checkforAuthUser(auth, $state){
         if(!auth.isLoggedIn()){
            alert('you have to be logged in to view this page');
            
            $state.go('login');
        }
        else if(auth.isLoggedIn){
            return auth.currentUser();
            $state.go('creative.user.feed');
        };
    };
    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('login', {
            url: '/login',
            templateUrl: '/views/login.html',
            controller: 'authCtrl',
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                  $state.go('creative.crm.dash');
                }
              }]
        })
        .state('creative', {
            abstract: true,
            url: '/creative',
            templateUrl: '/views/main.html',
            resolve: {
                resolvedUser: checkforAuthUser
            }
        })
        .state('creative.crm', {
            url: '/crm',
            templateUrl: '/views/crm/crm.html',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        })
        .state('creative.crm.dash', {
            url: '/dash',
            templateUrl: '/views/crm/dash-crm.html',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        })
        //crm child customers view
        .state('creative.crm.customers', {
            url: '/customers',
            templateUrl: '/views/crm/customer/main.html',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        }).state('creative.crm.customers.customerList', {
            url: '/list',
            templateUrl: '/views/crm/customer/customer.html',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        }).state('creative.crm.customers.customer', {
            url: '/customer/{custId}',
            templateUrl: '/views/users/customerinfo.html',
            controller: 'customerCtrl',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        })
        //crm child contracts view
        .state('creative.crm.contracts', {
            url: '/contracts',
            templateUrl: '/views/crm/contracts/main.html',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        }).state('creative.crm.contracts.contract', {
            url: '/{contId}',
            templateUrl: '/views/users/contractinfo.html',
            controller: 'contCtrl',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        }).state('creative.crm.contracts.contractList', {
            url: '/list',
            templateUrl: '/views/crm/contracts/contracts.html',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        })
        //crm child events views
        .state('creative.crm.events', {
            url: '/crm',
            templateUrl: '/views/crm/events/events.html',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        })  
        
        .state('creative.feed', {
            url: '/feed',
            templateUrl: '/views/feed.html',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        }).state('creative.inbox', {
            url: '/inbox',
            templateUrl: '/views/inbox/inbox.html',
            resolved: {
                CurrentUser: function(resolvedUser){
                        return resolvedUser;
                }
            }
        }) .state('creative.userManagement', {
            url: '/userManagement',
            templateUrl: '/views/admin/user/userManagement.html',
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                    if(auth.currentUser().role !== 'Admin'){
                        alert('you do not have permission for this view');
                        $state.go('creative.crm.dash');
                    }
                }
              }]
        }).state('creative.userManagement.createUser', {
            url: '/createUser',
            templateUrl: '/views/admin/user/createUser.html'
        }).state('creative.userManagement.editUser', {
            url: '/editUser/{userId}',
            controller: 'userManagementCtrl',
            templateUrl: '/views/admin/user/editUser.html'
        })
        .state('creative.userManagement.userTable', {
            url: '/userTable',
            templateUrl: '/views/admin/user/users.html'
        }).state('signup', {
            url: '/signup',
            templateUrl: '/views/signup.html',
            controller: 'authCtrl'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
       
    });
