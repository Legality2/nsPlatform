app.controller('userEditCtrl', ['$scope', 'userService', '$stateParams', 'auth', 'userFactory', 
function($scope, userService, $stateParams, auth, userFactory){
    $scope.sUser = userService.single({id: $stateParams.userId});
  
}]);