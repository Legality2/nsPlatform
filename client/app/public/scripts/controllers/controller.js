
app.controller('navCtrl', function($rootScope, $scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.logOut = auth.logOut;
  $scope.currentUser = auth.currentUser();
  $scope.isAdminType = function(){
    var user = auth.currentUser();
    
      return true
  };
  $scope.isBasicType = function(){
    var user = auth.currentUser();
    if(user.role == 'Basic'){
      return true
    } else {
      return false
  };
}
});

app.controller("lineCtrl", function ($scope) {

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
});
       

app.controller('authCtrl', ['$rootScope', '$scope', '$state', 'auth', '$http', function($rootScope, $scope, $state, auth, $http){
  $scope.User = {};
  $scope.newUser = {};
  $scope.googleUrl = {};
  $http.get('/api/auth/google').then(function(data){
    console.log(data);   
    $scope.googleUrl.info = data.data;
});
console.log($scope.googleUrl);
  
  $scope.register = function(){
    auth.register($scope.newUser);
  };

  $scope.logIn = function(){
    auth.logIn($scope.User);
  };
  $scope.logOut = function(){
    auth.logOut();
  };
}]);
app.controller('userManagementCtrl', function($scope, $state, userService, $stateParams, auth, userFactory){
  $scope.newUser = {};
  
  $scope.isAdminType = function(){
    var user = auth.currentUser();
    if(user.userType == 'Admin'){
      return true
    } else {
      return false
    };
  };
  $scope.isBasicType = function(){
    var user = auth.currentUser();
    if(user.userType == 'Basic'){
      return true
    } else {
      return false
  };
}
  $scope.users = userService.query();

  $scope.selectedUser = userService.single({id: $stateParams.userId});
  

  $scope.createUser = function(obj){
    console.log($scope.newUser);
    userFactory.newUser($scope.newUser);
  };
  $scope.deleteUser = function(id){
    userFactory.removeUser(id);
    $scope.users = userService.query();
    $state.reload();
  };
});

app.controller('userCtrl', ['$scope', 'auth', function($scope, auth){
  $scope.user = auth.currentUser();
  console.log("test " + $scope.user);
}]);

//single customer info
app.controller('customerCtrl', ['$scope', 'custService', '$stateParams', 'auth', function($scope, custService, $stateParams, auth){
  $scope.customer = custService.single({user: auth.currentUser()._id, id: $stateParams.custId}, function(response){
    console.log(response);
  });

}]);



//customer controller
app.controller('custCtrl', ['$scope', 'custService', '$state', 'auth', function($scope, custService, $state, auth){
   $scope.user = auth.currentUser();
   console.log($scope.user);
  custService.query({user: $scope.user._id}, function(res){
    console.log(res);
    $scope.customers = res.info;
  });
  $scope.newCust = {};

  $scope.createCust = () => {
    $scope.newCust.owner = auth.currentUser()._id;
    custService.create($scope.newCust, function(data){
      console.log(data);
      $state.reload();
    });
  };

  $scope.deleteCust = (id) => {
    customerService.remove({id: id});
    $state.reload();
  };
}]);
//contract controller
app.controller('contCtrl', ['$scope', 'contractService', 'custService', '$state', 'auth', '$stateParams', function($scope, contractService, custService, $state, auth, $stateParams){
  $scope.contracts = contractService.query({user: auth.currentUser()._id});
  $scope.cont = contractService.single({id: $stateParams.contId});
  custService.query({user: auth.currentUser()._id}, function(res){
    console.log(res.info);
    $scope.customers = res.info;
  });
  $scope.newContract = {};

  $scope.createContract = () => {
    $scope.newContract.userId = auth.currentUser()._id;
    customerService.create($scope.newContract, function(data){
      alert(data.msg);
    });
  };

  $scope.removeContract = (id) => {
    contractService.remove({id: id});
    $state.reload();
  };
}]);
//property controller
app.controller('propCtrl', ['$scope', 'propService', '$state', function($scope, propService, $state){
  $scope.propertys = propService.query();
  $scope.newProp = {};

  $scope.createProp = () => {
    $scope.newProp.userId = auth.currentUser()._id;
    propService.create($scope.newProp, function(data){
      alert(data.msg);
    });
  };

  $scope.removeProp = (id) => {
    propService.remove({id: id});
    $state.reload();
  };
}]);
app.controller('todoCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
  $scope.toDo = {};
  
  $scope.todos = [{title: "project due"}];
  $scope.user = auth.me;
  $scope.newTodo = (t) => {
    $scope.todos.push(t);
    console.log($scope.todos);
    $state.reload();
  };
}]);
