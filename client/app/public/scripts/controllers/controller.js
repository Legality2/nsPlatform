
  app
    .controller('authLoginCtrl', ["$scope", "authService", function($scope, authService){

    }])
    .controller('authRegisterCtrl', ["$scope", "authService", function($scope, authService){
      $scope.newUser = {};
      $scope.signupUser = function(){
      authService.register($scope.newUser)
        console.log($scope.newUser)
        .then((user) => {
          localStorage.setItem('token', user.data.token);
          console.log(user);
          $state('user.feed');
        })
        .catch((err) => {
          console.log(err);
        });
  }

    }])
    .controller('authStatusController', authStatusController);
 

function authStatusController(authService) {
  /*jshint validthis: true */
  const vm = this;
  vm.isLoggedIn = false;
  const token = localStorage.getItem('token');
  if (token) {
    authService.ensureAuthenticated(token)
    .then((user) => {
      if (user.data.status === 'success');
      vm.isLoggedIn = true;
    })
    .catch((err) => {
      console.log(err);
    });      
  }
}



//http functions
//authService.register(vm.user)
//    console.log(vm.user)
//    .then((user) => {
//      localStorage.setItem('token', user.data.token);
//      console.log(user);
 //     $state('user.feed');
 //   })
//    .catch((err) => {
 //     console.log(err);
 //   })