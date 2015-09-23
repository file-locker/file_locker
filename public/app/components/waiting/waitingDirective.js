module.exports = function () {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true,
        link: function (scope, element, attrs) {
        },
        templateUrl: 'app/components/waiting/waitingView.html'
    };
};