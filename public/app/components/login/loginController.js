module.exports = function ($scope, $http, $location) {
    $scope.showSpinny = false;

    $scope.login = function () {
        $scope.showSpinny = true;

        var res = $http.post('/fl/user/signin', {
            username: $scope.username,
            password: $scope.password
        });

        res.success(function (data){
            $rootScope.user = data;
            $scope.showSpinny = false;
            $location.path('/');
        });

        res.error(function(data){
            $scope.wrongPass = true;
        });

    };
};