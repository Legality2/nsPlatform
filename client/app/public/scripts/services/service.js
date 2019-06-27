(function() {

  'use strict';

  app
   
    .service('authService', authService);

  authService.$inject = ['$http'];

 function authService($http) {
  /*jshint validthis: true */
  const baseURL = 'http://localhost:3000/api/auth/';
  this.login = function(user) {
    return $http({
      method: 'POST',
      url: baseURL + 'login',
      data: user,
      headers: {'Content-Type': 'application/json'}
    });
  };
  
this.ensureAuthenticated = function(token) {
  return $http({
    method: 'GET',
    url: baseURL + 'user',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });
};

this.register = function(user) {
  return $http({
    method: 'POST',
    url: baseURL + 'signup',
    data: user,
    headers: {'Content-Type': 'application/json'}
  });
};
}

})();