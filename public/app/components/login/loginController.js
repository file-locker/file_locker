module.exports = function ($scope, $http, $location, $httpProvider) {
    $scope.user = null;
    $http.defaults.headers.common.Authorization = '';
    $scope.showSpinny = false;

    $scope.login = function () {
        $scope.showSpinny = true;
        $httpProvider.defaults.headers.common.Authorization = 'BASIC ' +
            btoa($scope.username + ':' + $scope.password);

        var res = $http.get('/fl/signin', {});

        res.success(function (data){
            $rootScope.user = data;
            $httpProvider.defaults.headers.common.Authorization = 'BEARER ' + data.token;
            $scope.showSpinny = false;
            $location.path('/');
        });

        res.error(function(){
            $scope.wrongPass = true;
            $httpProvider.defaults.headers.common.Authorization = '';
        });

    };
};