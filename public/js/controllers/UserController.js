angular.module('meanStarterKit').controller('UserController',['$scope', 'UserService', '$timeout', function($scope, UserService, $timeout){

    $scope.selected = [];

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };
    // init list
    $scope.promise = getUsers();

    function getUsers(query) {
        return UserService.get().then(function(response){
                $scope.users = response.data;
        });
    }

    $scope.onPaginate = function (page, limit) {
        $scope.promise = getUsers(angular.extend({}, $scope.query, {page: page, limit: limit}));
    };

    $scope.onReorder = function (order) {
        $scope.promise = getUsers(angular.extend({}, $scope.query, {order: order}));

    };
}]);