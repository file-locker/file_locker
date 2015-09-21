app.controller('mainController', function ($scope, $rootScope) {
    $scope.pageName = 'File Locker';
    $rootScope.user = 't';
    $scope.username = 'Test';
    $scope.fileCount = 12;
    $scope.fileSizes = 512;
});