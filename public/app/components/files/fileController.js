app.controller('fileController', function ($scope, fileCryptService) {
    $scope.pageName = 'File Locker';

    $scope.files = [{filename: "testfile", size: 124, tags:"test file and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile", size: 124, tags:"test file and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "tesstfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile", size: 124, tags:"test file and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"},
        {filename: "testfile2", size: 2124, tags:"test file2 and things"}];

    var enc = fileCryptService.encrypt($scope, '1234', 'pass');
    console.log(enc.toString());
    var dec = fileCryptService.decrypt($scope, enc, 'pass');
    console.log(dec.toString());

});