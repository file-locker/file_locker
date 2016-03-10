module.exports = function ($scope, $http, $location, $rootScope) {
    $scope.showSpinny = false;

    if($rootScope.user){
        var res = $http.get('/fl/signout');

        res.success(function(){
            $rootScope.user = null;
            $scope.user = null;
            $http.defaults.headers.common.Authorization = '';
        });
    }

    var userLinks = [
        'sidebar_filemanager',
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

    $scope.login = function () {
        $scope.showSpinny = true;
        $http.defaults.headers.common['Authorization'] = 'BASIC ' +
            btoa($scope.username + ':' + $scope.password);

        var res = $http.get('/fl/signin');

        res.success(function (data){
            $rootScope.user = data.user;
            $http.defaults.headers.common.Authorization = 'BEARER ' + data.user.token;
            $scope.showSpinny = false;
            $location.path('/');
        });

        res.error(function(){
            $scope.wrongPass = true;
            $scope.showSpinny = false;
            $http.defaults.headers.common.Authorization = '';
        });

    };

    $scope.loginDemo = function() {
        $scope.username = 'demo';
        $scope.password = 'secret';
        $scope.login();
    };
};
