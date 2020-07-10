app.controller('fileCtrl', ['$scope', 'fileFactory', function($scope, fileFactory){

    //client file storage
    $scope.files = fileFactory.files();
        
    $scope.selectedFile = {};
    

    //check file type
    $scope.isPic = function(t){
        if(t == 'jpeg' ){
            return true
        }
    };
    $scope.isVid = function(t){
        if(t == 'mp4'){
            return true
        }
    };

    //refresh file list if update
}]);
app.controller('fileViewCtrl', ['$scope', '$stateParams', 'fileFactory', '$sce', function($scope, $stateParams, fileFactory, $sce){
    //selected file
    $scope.sFile = fileFactory.getFile($stateParams.fileId);

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
    //check file type
    $scope.isPic = function(){

        if($scope.sFile.type == 'jpeg' ){
            return true
        } else {
            return false
        }
    };
    $scope.isVid = function(t){
        if($scope.sFile.type == 'mp4'){
            return true
        } else { 
            return false
        }
    };
}]);




app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: 'https://localhost:3000',
      data: {username: $scope.username, file: file},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }
}]);