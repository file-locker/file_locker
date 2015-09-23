module.exports = function ($scope, $http, $location, $rootScope) {
    $scope.user = null;
    $http.defaults.headers.common.Authorization = '';
    $scope.showSpinny = false;

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
};