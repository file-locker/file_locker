app.config(function ($routeProvider, $locationProvider) {

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
        });

    $locationProvider.html5Mode(true);

});

var checkUser= function ($q, $rootScope, $location, $http) {
    if ($rootScope.user) {
        return true;
    } else {
        var deferred = $q.defer();
        $http.post("/signin", { userToken: "blah" })
            .success(function (response) {
                $rootScope.user = response.user;
                deferred.resolve(true);
            })
            .error(function () {
                deferred.reject();
                $location.path("/signin");
            });
        return deferred.promise;
    }
};