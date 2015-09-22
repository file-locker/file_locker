module.exports = function ($http, fileCryptService) {
    var fileTransferService = {};

    fileTransferService.post = function ($scope, callback, callbackerr) {

        var fileObj = {};
        var fileInput = $scope.dialogConfig.fileInput;
        fileObj.filename = fileInput.files[0].name;
        fileObj.size = fileInput.files[0].size;
        fileObj.tags = $scope.dialogConfig.tags;
        fileObj.desc = $scope.dialogConfig.desc;

        var reader = new FileReader();
        reader.onload = function (err) {
            fileObj.fileContent = fileCryptService.encrypt($scope,
                reader.result, $scope.configDialog.passphraseup);
            var res = $http.post('/', fileObj);
            res.success(function () {
                callback();
            });
            res.error(function (err) {
                callbackerr(err)
            });
        }.bind(this);
        reader.readAsArrayBuffer(fileInput.files[0]);
    };

    fileTransferService.get = function ($scope, file, callbackerr) {
        var res = $http.get('/' + file.id);

        res.success(function (data) {
            var trigger = document.createElement('a');
            try {
                var fileContents = fileCryptService.decrypt($scope, data,
                    $scope.configDialog.passphrasedn);
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
            callbackerr(data);
        });
    };

    fileTransferService.deleteFile = function ($scope, file, callback, callbackerr) {
        var res = $http.delete('/' + file.id);

        res.success(function () {
            callback();
        });

        res.error(function (data) {
            callbackerr(data);
        });
    };

    fileTransferService.updateFile = function ($scope, file, callback, callbackerr) {
        var res = $http.patch('/' + file.id);

        res.success(function () {
            callback();
        });

        res.error(function (data) {
            callbackerr(data);
        });
    };

    return fileTransferService;

};