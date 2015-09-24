module.exports = function ($scope, $rootScope) {
    $scope.pageName = 'User Profile';
    $scope.user = $rootScope.user;

    $scope.changePassword = function(){
        if($scope.newPass1 != $scope.newPass2){
            $scope.errorMessage = 'Passwords do not match';
        }

    }
};