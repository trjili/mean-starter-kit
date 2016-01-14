angular.module('meanStarterKit').controller('UserController',['$scope', 'UserService', '$mdDialog', function($scope, UserService, $mdDialog){

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

    $scope.showAdd = function(ev) {
        $mdDialog.show({
            controller: UserDialogController,
            templateUrl: '../../views/user/dialog/addUser.html',
            targetEvent: ev,
            clickOutsideToClose:true
        })
            .then(function(answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };

    function UserDialogController($scope, $mdDialog, $route) {
        $scope.user = {};
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.createUser = function() {
            UserService.create($scope.user).then(function(response){
                $mdDialog.hide();
                $route.reload();
            }, function(err){

            });
        };
    }

}]);