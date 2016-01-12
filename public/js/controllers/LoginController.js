angular.module('meanStarterKit').controller('LoginController',['$scope', '$rootScope', '$location', 'AuthenticationService', function($scope, $rootScope, $location, AuthenticationService){
    $scope.user = {};
    $scope.login = function(){
        AuthenticationService.login($scope.user.username, $scope.user.password, function (response) {
            if (response) {
                $location.path('/');
            }
        });
    };
}]);
