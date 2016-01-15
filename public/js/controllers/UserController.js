angular.module('meanStarterKit').controller('UserController',['$scope', 'UserService', '$mdDialog', '$route', function($scope, UserService, $mdDialog, $route){

    // datable data and pagination
    $scope.selected = [];

    $scope.query = {
        order: '_id',
        limit: 5,
        page: 1
    };

    // init list
    $scope.promise = getUsers($scope.query);

    function getUsers(query) {
        return UserService.get(query).then(function(response){
            var data = response.data;
            $scope.users = data.users;
            $scope.pages = data.pages;
            $scope.total = data.total;
        });
    }

    $scope.onPaginate = function (page, limit) {
        $scope.promise = getUsers(angular.extend({}, $scope.query, {page: page, limit: limit}));
    };

    $scope.onReorder = function (order) {
        $scope.promise = getUsers(angular.extend({}, $scope.query, {order: order}));

    };

    // add a user
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

    // delete one or more users
    $scope.deleteUsers = function(){
        var usersIds = [];
        angular.forEach($scope.selected, function(user){
            usersIds.push(user._id);
        });
        UserService.multipleDelete(usersIds).then(function(response){
            $route.reload();
        }, function(err){
        });
    }
}]);