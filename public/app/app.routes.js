module.exports = function ($routeProvider, $locationProvider) {

    var checkUser = function ($q, $rootScope, $location, $http) {
        if ($rootScope.user) {
            return true;
        } else {
            $location.path('/signin');
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: 'app/components/home/homeView.html',
            controller: 'mainController'
        })
        .when('/index.html', {
            templateUrl: 'app/components/home/homeView.html',
            controller: 'mainController'
        })
        .when('/files', {
            templateUrl: 'app/components/files/fileView.html',
            controller: 'fileController',
            resolve: {
                factory: checkUser
            }
        })
        .when('/files.html', {
            templateUrl: 'app/components/files/fileView.html',
            controller: 'fileController',
            resolve: {
                factory: checkUser
            }
        })
        .when('/user', {
            templateUrl: 'app/components/user/userView.html',
            controller: 'userController',
            resolve: {
                factory: checkUser
            }
        })
        .when('/user.html', {
            templateUrl: 'app/components/user/userView.html',
            controller: 'userController',
            resolve: {
                factory: checkUser
            }
        })
        .when('/signin', {
            templateUrl: 'app/components/login/loginView.html',
            controller: 'loginController'
        })
        .when('/signin.html', {
            templateUrl: 'app/components/login/loginView.html',
            controller: 'loginController'
        })
        .when('/signup', {
            templateUrl: 'app/components/register/registerView.html',
            controller: 'registerController'
        })
        .when('/signup.html', {
            templateUrl: 'app/components/register/registerView.html',
            controller: 'registerController'
        });

    $locationProvider.html5Mode(true);

};

