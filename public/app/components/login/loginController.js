module.exports = function ($scope, $http, $location, $rootScope) {
    $scope.user = null;
    $http.defaults.headers.common.Authorization = '';
    $scope.showSpinny = false;

    $scope.login = function () {
        //TODO remove test stub
        $rootScope.user = 'testuser';
        $location.path('/');
        return;

        $scope.showSpinny = true;
        $http.defaults.headers.common.Authorization = 'BASIC ' +
            btoa($scope.username + ':' + $scope.password);

        var res = $http.get('/fl/signin', {});

        res.success(function (data){
            $rootScope.user = data;
            $http.defaults.headers.common.Authorization = 'BEARER ' + data.token;
            $scope.showSpinny = false;
            $location.path('/');
        });

        res.error(function(){
            $scope.wrongPass = true;
            $http.defaults.headers.common.Authorization = '';
        });

    };
};