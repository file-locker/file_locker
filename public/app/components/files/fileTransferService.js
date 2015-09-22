module.exports = function ($http) {
    var fileTransferService = {};

    fileTransferService.post = function(postObj){
        return $http.post('/', postObj);
    };

    fileTransferService.get = function(url){
        return $http.get('/qqqq');
    };

    return fileTransferService;

};