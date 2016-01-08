angular.module('meanStarterKit').controller('LoginController',['$scope', '$rootScope', '$location', 'AuthenticationService', function($scope, $rootScope, $location, AuthenticationService){
    $scope.user = {};
    console.log('login controller');
    $scope.login = function(){
        console.log('login submit');
        AuthenticationService.login($scope.user.username, $scope.user.password);
    };
}]);
