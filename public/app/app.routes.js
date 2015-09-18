app.config(function($routeProvider, $locationProvider){
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
        });

    $locationProvider.html5Mode(true);
});