module.exports = function ($scope, $http, $location, $rootScope) {
    $scope.pageName = 'Sign Up';
    $scope.problemMsg = '';
    $scope.showSpinny = false;

    $scope.registerUser = function () {
        if ($scope.password != $scope.password2) {
            $scope.problemMsg = 'Passwords do not match';
            return false;
        }
        $scope.showSpinny = true;
        var res = $http.post('/fl/signup', {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
            invitationCode: $scope.invite
        });
        res.success(function(data){
            $scope.showSpinny = false;
            $rootScope.user = data.user;
            $http.defaults.headers.common['Authorization'] = 'BEARER ' + data.user.token;
            $location.path('/');
        });
        res.error(function(data){
            $scope.problemMsg = data;
            $scope.showSpinny = false;
        });
    };
};