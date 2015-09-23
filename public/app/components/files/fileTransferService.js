module.exports = function ($http, fileCryptService) {
    var fileTransferService = {};

    fileTransferService.post = function ($scope, callback, callbackerr) {

        var fileObj = {};
        var fileInput = document.getElementById('uploadfile');
        console.log($scope.user);
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
        var res = $http.get('/fl/files' + file.id);

        res.success(function (data) {
            var trigger = document.createElement('a');
            try {
                var fileContents = fileCryptService.decrypt($scope, data,
                    $scope.dialogConfig.passphrasedn);
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
            } catch (err) {
                $scope.mode = 'wrongkey';
            }
        });

        res.error(function (data) {
            callbackerr('Could not download ' + file.name + '. ' + data.msg);
        });
    };

    fileTransferService.deleteFile = function ($scope, file, callback, callbackerr) {
        var res = $http.delete('/fl/files' + file.id);

        res.success(function () {
            callback(file.name + ' successfully deleted.');
        });

        res.error(function (data) {
            callbackerr('Could not delete ' + file.name + '. '+ data.msg);
        });
    };

    fileTransferService.updateFile = function ($scope, file, callback, callbackerr) {
        var res = $http.patch('/fl/files' + file.id);

        res.success(function (data) {
            callback(file.name + ' successfully updated.');
        });

        res.error(function (data) {
            callbackerr('Could not update ' + file.name + '. '+ data.msg);
        });
    };

    return fileTransferService;

};