module.exports = function ($scope, fileTransferService) {
    $scope.pageName = 'File Locker';

    //TODO get user file list

    $scope.files = [{
        name: "testfileone.txt",
        description: "This is a test file",
        size: 125,
        tags: "test fish water"
    }];

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
        fileTransferService.post($scope, $scope.fileOperationSuccess,
            $scope.fileOperationError);
    };

    $scope.download = function (file) {
        fileTransferService.get($scope, file, $scope.fileOperationError);
    };

    $scope.deleteFile = function () {
        fileTransferService.deleteFile($scope, file, $scope.fileOperationSuccess,
            $scope.fileOperationError);
    };

    $scope.update = function () {
        fileTransferService.update($scope, file, $scope.fileOperationSuccess,
            $scope.fileOperationError);
    };

    $scope.fileOperationSuccess = function () {
        $scope.toggleModal();
        $scope.dialogConfig = {};
    };

    $scope.fileOperationError = function (err) {
        $scope.toggleModal();
        $scope.dialogConfig = {};
    };

};