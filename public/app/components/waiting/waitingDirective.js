module.exports = function () {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true,
        transclude: true,
        link: function (scope, element, attrs) {
            scope.show = true;
        },
        templateUrl: 'app/components/waiting/waitingView.html'
    };
};