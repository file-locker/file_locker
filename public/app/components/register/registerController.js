module.exports = function ($scope, $http, $location, $httpProvider) {
    $scope.pageName = 'Sign Up';
    $scope.problemMsg = '';
    $scope.showSpinny = false;

    $scope.register = function () {
        if ($scope.password != $scope.password2) {
            $scope.problemMsg = 'Passwords do not match';
            return false;
        }
        $scope.showSpinny = true;
        var res = $http.post('/fl/signup', {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
            invitation: $scope.invite
        });
        res.success(function(data){
            $scope.showSpinny = false;
            $rootScope.user = data;
            $httpProvider.defaults.headers.common.Authorization = 'BEARER ' + data.token;
            $location.path('/');
        });
        res.error(function(data){
            $scope.problemMsg = data;
            $scope.showSpinny = false;
        });
    };
};