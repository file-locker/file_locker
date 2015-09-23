module.exports = function ($scope, fileTransferService, $http, $rootScope) {
    $scope.pageName = 'File Locker';
    $scope.user = $rootScope.user;

    //TODO remove list stub

    $scope.files = [{}];

    $scope.getFileList = function () {
        var res = $http.get('/fl/userFiles/');

        res.success(function(data){
            $scope.files = data.msg;
        });

        res.error(function(data){
            $scope.successMessage = 'No files found.  Upload when ready!';
        })
    };

    $scope.getFileList();

    $scope.showSpinny = false;
    $scope.dialogConfig = {};

    $scope.modalShown = false;

    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.dialogUpload = function () {
        dialogToggle('upload', null, $scope.upload);
    };

    $scope.dialogDownload = function (file) {
        dialogToggle('download', file, $scope.download);
    };

    $scope.dialogUpdate = function (file) {
        dialogToggle('update', file, $scope.update);
    };

    $scope.dialogDelete = function (file) {
        dialogToggle('delete', file, $scope.deleteFile);
    };

    var dialogToggle = function (mode, file, callback) {
        $scope.dialogConfig.mode = mode;
        $scope.dialogConfig.file = file;
        $scope.dialogConfig.callback = callback;
        $scope.modalShown = true;
    };

    $scope.upload = function () {
        $scope.showSpinny = true;
        fileTransferService.post($scope, $scope.fileOperationSuccess,
            $scope.fileOperationError);
    };

    $scope.download = function (file) {
        $scope.showSpinny = true;
        fileTransferService.get($scope, file, $scope.fileOperationError);
    };

    $scope.deleteFile = function (file) {
        $scope.showSpinny = true;
        fileTransferService.deleteFile($scope, file, $scope.fileOperationSuccess,
            $scope.fileOperationError);
    };

    $scope.update = function (file) {
        $scope.showSpinny = true;
        fileTransferService.update($scope, file, $scope.fileOperationSuccess,
            $scope.fileOperationError);
    };

    $scope.fileOperationSuccess = function (message) {
        $scope.showSpinny = false;
        $scope.toggleModal();
        $scope.dialogConfig = {};
        $scope.errorMessage = '';
        $scope.successMessage = message;
        $scope.getFileList();
    };

    $scope.fileOperationError = function (message) {
        $scope.showSpinny = false;
        $scope.toggleModal();
        $scope.dialogConfig = {};
        $scope.successMessage = '';
        $scope.errorMessage = message;
    };

};