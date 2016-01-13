angular.module('meanStarterKit').controller('LoginController',['$scope', '$rootScope', '$location', 'AuthenticationService', function($scope, $rootScope, $location, AuthenticationService){
    $scope.user = {};
    $scope.err = false;
    $scope.login = function(){
        AuthenticationService.login($scope.user.username, $scope.user.password, function (result) {
            if (result.success) {
                AuthenticationService.autoLogin();
                $location.path('/');
            } else {
                console.log(result);
                $scope.err = result.message;
                console.log($scope.err);
            }
        });
    };

    $scope.reset = function() {
        $scope.user = {};
        $scope.err = false;
    }

    $scope.logout = function() {
        AuthenticationService.logout();
        $location.path('/login');
    }
}]);
