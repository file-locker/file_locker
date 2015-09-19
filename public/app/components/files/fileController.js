app.controller('fileController', function ($scope, fileCryptService) {
    $scope.pageName = 'File Locker';

    $scope.files = [{name: "testfileone.txt", desc:"This is a test file", size:125, tags:"test fish water"}];

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


    /*    var enc = fileCryptService.encrypt($scope, '1234', 'pass');
        try {
            var dec = fileCryptService.decrypt($scope, enc, 'pass');
        } catch (e) {

            //TODO decrypt failure warning

        }*/

    $scope.upload = function () {
        var fileObj = {};

        var fileInput = $('#fileinput')[0];
        fileObj.filename = fileInput.files[0].name;
        fileObj.size = fileInput.files[0].size;
        fileObj.tags = $('#tags')[0].value;
        fileObj.desc = $('#desc')[0].value;

        var reader = new FileReader();
        reader.onload = function(blob){
            var encoded = fileCryptService.encrypt($scope, blob, $('#passphraseup')[0].value);
            alert(encoded);
        }.bind(this);

        reader.readAsBinaryString(fileInput.files[0]);

        //TODO Send file via AJAX
    };

    $scope.download = function (file) {
        var trigger = document.createElement('a');

        //TODO get filecontents via ajax
        try {
            var fileContents = fileCryptService.decrypt($scope, data, $('#passphrasedn')[0].value);
            trigger.setAttribute('href', 'data:text/plain;charset=utf-8,' + fileContents);
            trigger.setAttribute('download', file.name);
            if (document.createEvent) {
                var event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                trigger.dispatchEvent(event);
            } else {
                trigger.click();
            }
        } catch (e) {
            $scope.mode = 'wrongkey';
        }
    };

    $scope.delete = function (file) {

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