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
            controller: 'fileController'
        })
        .when('/files.html', {
            templateUrl: 'app/components/files/fileView.html',
            controller: 'fileController'
        })
        .when('/user', {
            templateUrl: 'app/components/user/userView.html',
            controller: 'userController'
        })
        .when('/user.html', {
            templateUrl: 'app/components/user/userView.html',
            controller: 'userController'
        });

    $locationProvider.html5Mode(true);
});