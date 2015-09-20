app.controller('fileController', function ($scope, fileCryptService, fileTransferService) {
    $scope.pageName = 'File Locker';

    //TODO get user file list

    $scope.files = [{
        name: "testfileone.txt",
        desc: "This is a test file",
        size: 125,
        tags: "test fish water"
    }];

    $scope.modalShown = false;

    $scope.toggleUpload = function () {
        $scope.mode = 'upload';
        $scope.toggleModal();
    };

    $scope.toggleDelete = function (file) {
        $scope.targetFile = file;
        $scope.mode = 'delete';
        $scope.toggleModal();
    };

    $scope.toggleUpdate = function (file) {
        $scope.targetFile = file;
        $scope.mode = 'update';
        $scope.toggleModal();
    };

    $scope.toggleDownload = function (file) {
        $scope.targetFile = file || $scope.targetFile;
        $scope.mode = 'download';
        $scope.toggleModal();
    };

    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.upload = function () {
        var fileObj = {};

        var fileInput = $('#fileinput')[0];
        fileObj.filename = fileInput.files[0].name;
        fileObj.size = fileInput.files[0].size;
        fileObj.tags = $('#tags')[0].value;
        fileObj.desc = $('#desc')[0].value;

        var reader = new FileReader();
        reader.onload = function (e) {
            var encoded = fileCryptService.encrypt($scope, reader.result, $('#passphraseup')[0].value);
            fileObj.fileContent = encoded;
            var res = fileTransferService.post(fileObj);
            res.success(function (data, status, headers, config) {
                //TODO update user file list
                $scope.toggleModal();
            });
        }.bind(this);

        reader.readAsArrayBuffer(fileInput.files[0]);
    };

    $scope.download = function (file) {

        var res = fileTransferService.get('nourl');

        res.success(function(data, status, headers, config){
            var trigger = document.createElement('a');
            try {
                var file = {};
                file.name = 'white';
                var fileContents = fileCryptService.decrypt($scope, data, $('#passphrasedn')[0].value);
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

        res.error(function(data, status, headers, config){
            alert('error');
        });

    };

    $scope.deleteFile = function (file) {

        //TODO send delete request

    };

    $scope.update = function (file) {
        $scope.targetFile.name = $('#updName')[0].value;
        $scope.targetFile.tags = $('#updTags')[0].value;
        $scope.targetFile.desc = $('#updDesc')[0].value;
        $scope.toggleModal();

        //TODO send file update command

    };

});