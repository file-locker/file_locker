module.exports = function ($scope, $rootScope, $http) {
    $scope.user = $rootScope.user;
    $scope.pageName = 'File Locker';

    var userLinks = [
        'sidebar_filemanager',
        'sidebar_userprofile',
        'sidebar_signout',
        'menu_userprofile',
        'menu_signout'
    ];

    var nonUserLinks = [
        'sidebar_signin',
        'sidebar_signup',
        'menu_signup',
        'menu_signin'
    ];

    if (!$scope.user) {
        for (var i = 0; i < userLinks.length; i++){
            hideElement(userLinks[i]);
        }
        for (var i = 0; i < nonUserLinks.length; i++){
            showElement(nonUserLinks[i]);
        }
    } else {
        for (var i = 0; i < userLinks.length; i++){
            showElement(userLinks[i]);
        }
        for (var i = 0; i < nonUserLinks.length; i++){
            hideElement(nonUserLinks[i]);
        }
    }

    function showElement(id) {
        var element = $('#' + id);
        element.removeClass('ng-hide');
        element.addClass('ng-show');
    }

    function hideElement(id) {
        var element = $('#' + id);
        element.removeClass('ng-show');
        element.addClass('ng-hide');
    }

    $scope.getFileStats = function () {
        var res = $http.get('/fl/dataStats/');

        res.success(function (data) {
            $scope.fileCount = data.msg.fileCount || 0;
            $scope.fileBytes = data.msg.diskSize || 0;
        });

        res.error(function () {
            alert('Server is not responding.  Please try again later.');
        })
    };

    $scope.getFileStats();
};