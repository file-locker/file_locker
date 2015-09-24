module.exports = function ($http, fileCryptService) {
    var fileTransferService = {};

    fileTransferService.post = function ($scope, callback, callbackerr) {
        $http.defaults.headers.common.Authorization = 'BEARER ' + $scope.user.token;
        var fileObj = {};
        var fileInput = document.getElementById('uploadfile');
        fileObj.name = fileInput.files[0].name;
        fileObj.orgFileSize = fileInput.files[0].size;
        fileObj.tags = $scope.dialogConfig.tags;
        fileObj.description = $scope.dialogConfig.description;
        fileObj.createdBy = $scope.user.username;

        var reader = new FileReader();
        reader.onload = function () {
            fileObj.fileContents = fileCryptService.encrypt($scope,
                reader.result, $scope.dialogConfig.passphraseup);
            var res = $http.post('/fl/files', fileObj);
            res.success(function () {
                callback(fileObj.name + ' encrypted and uploaded.');
            });
            res.error(function (err) {
                callbackerr('Could not upload ' + fileObj.name + '. ' + err);
            });
        }.bind(this);
        reader.readAsArrayBuffer(fileInput.files[0]);
    };

    fileTransferService.get = function ($scope, file, callbackerr) {
        var res = $http.get('/fl/files/' + $scope.dialogConfig.file.fileLink);
        res.success(function (data) {
            var trigger = document.createElement('a');
            try {
                var fileContents = fileCryptService.decrypt($scope, data.msg.fileContents,
                    $scope.dialogConfig.passphrasedn);

                trigger.setAttribute('href', window.URL.createObjectURL(fileContents));
                trigger.setAttribute('download', $scope.dialogConfig.file.name);
                if (document.createEvent) {
                    var event = document.createEvent('MouseEvents');
                    event.initEvent('click', true, true);
                    trigger.dispatchEvent(event);
                    $scope.toggleModal();
                    return;
                } else {
                    console.log('click');
                    trigger.click();
                    $scope.toggleModal();
                    return;
                }

            } catch (err) {
                console.log(err);
                $scope.dialogConfig.mode = 'wrongkey';
            }
        });

        res.error(function (data) {
            callbackerr('Could not download ' + file.name + '. ' + data.msg);
        });
    };

    fileTransferService.deleteFile = function ($scope, file, callback, callbackerr) {
        var res = $http.delete('/fl/files/' + $scope.dialogConfig.file._id);

        res.success(function () {
            callback($scope.dialogConfig.file.name + ' successfully deleted.');
        });

        res.error(function (data) {
            callbackerr('Could not delete ' + $scope.dialogConfig.file.name + '. ' + data.msg);
        });
    };

    fileTransferService.updateFile = function ($scope, file, callback, callbackerr) {
        var fileObj = {};
        fileObj.name = $scope.dialogConfig.file.name;
        fileObj.tags = $scope.dialogConfig.file.tags;
        fileObj.description = $scope.dialogConfig.file.description;

        var res = $http.patch('/fl/files/' + $scope.dialogConfig.file._id,
            fileObj);

        res.success(function () {
            callback($scope.dialogConfig.file.name + ' successfully updated.');
        });

        res.error(function (data) {
            callbackerr('Could not update ' + $scope.dialogConfig.file.name +
                '. ' + data.msg);
        });
    };

    return fileTransferService;

};