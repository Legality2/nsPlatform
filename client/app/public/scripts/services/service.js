app.factory('auth', ['$http','$window', '$state', '$localStorage', 'loginService', 'signUpService', function($http, $window, $state, $localStorage, loginService, signUpService){
  var auth = {};
  var storage = $localStorage;
  storage.token;
  auth.online = false;
  
   
    auth.saveToken = function(token){
      storage.token = token;
      
    };

    auth.getToken = function(){
      return storage.token
    };

    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        auth.online = true;
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    auth.me = () => {
      $http.get('/api/auth/me').then(function(data){
          console.log(data);   
      });
    };

    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
          console.log(payload);
        
      };
      return payload;
    };

    auth.currentUserRole = function(){
      var user = auth.currentUser();

      return user;
    };

    auth.register = function(user){
	return $http.post('/api/auth/signup', user).then(function(data){
          
          auth.saveToken(data.data.token);
          if(!auth.isLoggedIn){
            $state.go('signup');
          } else if(auth.isLoggedIn && auth.currentUser() !== null) {
            $state.go('creative.crm.dash');
          }
          
        });

    };

    auth.logIn = function(user){
      loginService.login(user, function(res){
        auth.saveToken(res.token);
        $state.go('creative.crm.dash');
      })
    };
   
    auth.logOut = function(){
      delete storage.token;
      $state.go('login');
    };



  return auth
}]);


//user factory
app.factory('userFactory', ['$http', 'userService', '$state', function($http, userService, $state){
  var userFactory = {};



  //user products

  //user music

  //user products

  //get all users 

  userFactory.getAllUsers = function(){ 
    return userService.query()
};



  //get users of certain type

  //delete user
  userFactory.removeUser = function(id){
    userService.remove({id: id});
    $state.go('admin.userManagement.userTable');
  };

  //user stats

  //create user either admin or basic
  userFactory.newUser = function(usr){
    userService.create(usr, function(response){
      
      alert('new user was created');
      $state.go('admin.userManagement.userTable');

    });
    };
 



  return userFactory
}]);

//contract service
 app.service('contractService', ['$resource', function($resource){
    return $resource('/api/user/:user/contract/:id', {}, {
            query: {method: 'GET', isArray: true},
            single: {method: 'GET', params: {user: '@user',id: '@id'}},
            create: {method: 'POST'},
            update: {method: 'PUT', params: {id: '@id'}},
            remove: {method: 'DELETE', params: {id: '@id'}}
    });
}]);

//contract service
app.service('todoService', ['$resource', function($resource){
  return $resource('/api/todo/:id', {}, {
          query: {method: 'GET', isArray: true},
          create: {method: 'POST'},
          update: {method: 'PUT', params: {id: '@id'}},
          remove: {method: 'DELETE', params: {id: '@id'}}
  });
}]);

app.service('custService', ['$resource', function($resource){
  return $resource('/api/user/:user/customer/:id', {}, {
          query: {method: 'GET', params: {user: '@user'}},
          queryUser: {method: 'GET', isArray: true, params: {user: '@user'}},
          single: {method: 'GET', params: {id: '@id'}},
          create: {method: 'POST'},
          update: {method: 'PUT', params: {id: '@id'}},
          remove: {method: 'DELETE', params: {id: '@id'}}
  });
}]);
app.service('userService', ['$resource', function($resource){
  return $resource('/api/user/:id', {}, {
          query: {method: 'GET', isArray: true},
          querySelect: {method: 'GET', isArray: true, params: {id: '@id'}},
          single: {method: 'GET', isArray: true, params: {id: '@id'}},
          create: {method: 'POST'},
          update: {method: 'PUT', params: {id: '@id'}},
          remove: {method: 'DELETE', params: {id: '@id'}}
  });
}]);
app.service('loginService', ['$resource', function($resource){
  return $resource('/api/auth/login', {}, {
          login: {method: 'POST'}
  });
}]);
app.service('googleService', ['$resource', function($resource){
  return $resource('/api/auth/google', {}, {
    query: {method: 'GET'},      
    login: {method: 'POST'}
  });
}]);
app.service('signUpService', ['$resource', function($resource){
  return $resource('/api/auth/login', {}, {
          signup: {method: 'POST'}
  });
}]);
