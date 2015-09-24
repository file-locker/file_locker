module.exports = function ($scope, $rootScope, $http) {
    $scope.pageName = 'User Profile';
    $scope.user = $rootScope.user;

    $scope.changePassword = function(){
        $scope.successMessage = '';
        $scope.errorMessage = '';
        if($scope.newPass1 != $scope.newPass2){
            $scope.errorMessage = 'Passwords do not match';
        }
        var res = $http.post('/fl/changePassword', {password:$scope.newPass1});

        res.success(function(){
            $scope.successMessage = 'Password successfully changed.';
        });

        res.error(function(err){
            $scope.errorMessage = "Unable to change password:" + err.msg;
        });
    }
};