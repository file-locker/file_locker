module.exports = function ($scope, fileCryptService, fileTransferService) {
    $scope.pageName = 'File Locker';

    //TODO get user file list

    $scope.files = [{
        name: "testfileone.txt",
        desc: "This is a test file",
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
        var fileObj = {};

        var fileInput = $scope.fileInput;
        fileObj.filename = fileInput.files[0].name;
        fileObj.size = fileInput.files[0].size;
        fileObj.tags = $scope.tags;
        fileObj.desc = $scope.desc;

        var reader = new FileReader();
        reader.onload = function (e) {
            var encoded = fileCryptService.encrypt($scope, reader.result, $scope.passphraseup);
            fileObj.fileContent = encoded;
            var res = fileTransferService.post(fileObj);
            res.success(function () {
                //TODO update user file list
                $scope.toggleModal();
            });
        }.bind(this);

        reader.readAsArrayBuffer(fileInput.files[0]);
    };

    $scope.download = function () {

        var res = fileTransferService.get('nourl');

        res.success(function (data) {
            var trigger = document.createElement('a');
            try {
                var file = {};
                file.name = 'white';
                var fileContents = fileCryptService.decrypt($scope, data, $scope.passphrasedn);
                trigger.setAttribute('href', window.URL.createObjectURL(fileContents));
                trigger.setAttribute('download', file.name);
                if (document.createEvent) {
                    var event = document.createEvent('MouseEvents');
                    event.initEvent('click', true, true);
                    trigger.dispatchEvent(event);
                } else {
                    trigger.click();
                }
                scope.toggleModal();
            } catch (e) {
                console.log(e);
                $scope.mode = 'wrongkey';
            }
        });

        res.error(function (data, status, headers, config) {
            alert('error');
        });

    };

    $scope.deleteFile = function () {

        //TODO send delete request

    };

    $scope.update = function () {

        $scope.toggleModal();

        //TODO send file update command

    };

};