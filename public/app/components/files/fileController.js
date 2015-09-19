app.controller('fileController', function ($scope, fileCryptService) {
    $scope.pageName = 'File Locker';

    $scope.files = [];

    $scope.modalShown = false;
    $scope.toggleUpload = function () {
        $scope.upload = true;
        $scope.modalShown = !$scope.modalShown;
    };

    var enc = fileCryptService.encrypt($scope, '1234', 'pass');
    try {
        var dec = fileCryptService.decrypt($scope, enc, 'pass');
    } catch (e) {
        console.log(e);
        alert('stop right thar!');
        //USERALERTWARNING
    }

    $scope.upload = function () {
        var fileObj = {};

        var fileInput = $('#fileinput')[0];
        fileObj.filename = fileInput.files[0].name;
        fileObj.size = fileInput.files[0].size;
        fileObj.tags = $('#tags')[0].value;
        fileObj.desc = $('#desc')[0].value;

        var reader = new FileReader();
        reader.onload = function(blob){
            console.log($('#passphrase')[0].value);
            var encoded = fileCryptService.encrypt($scope, blob, $('#passphrase')[0].value);
            alert(encoded);
        }.bind(this);

        reader.readAsBinaryString(fileInput.files[0]);
    };

});