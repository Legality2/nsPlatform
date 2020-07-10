app.factory('fileFactory', ['$http', function($http){
    var fileMg = {};

        fileMg.files = () => {
            //mock backend
            var serve = [
                {filename: 'anime-pic', type: 'jpeg', fileId: '23456', src:'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80'},
                {filename: 'anime-vid', type: 'mp4', fileId: '43566', src: 'https://www.youtube.com/embed/4EpuqBQKewM'},
                {filename: 'anime-audio', type: 'audio', fileId: '54366', src: ''}
            ];

            return serve
            };


        fileMg.getFile = (id) => {
            var files = fileMg.files();
            let res = files.filter(it => it.fileId.includes(id));
            var f = res[0];
            
            return f
        };
        fileMg.uploadFile = () => {

        };
        fileMg.uploadFiles = () => {

        };

        fileMg.deleteFile = () => {

        };

            return fileMg
}]);


app.service('fileService', ['$resource', function($resource){
    return $resource('/api/files/:id', {}, {
            query: {method: 'GET', isArray: true},
            single: {method: 'GET', params: {id: '@id'}},
            create: {method: 'POST'},
            update: {method: 'PUT', params: {id: '@id'}},
            remove: {method: 'DELETE', params: {id: '@id'}}
    });
  }]);