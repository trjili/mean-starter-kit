angular.module('meanStarterKit').controller('IndexController', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog',
    function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };
        $scope.menu = [
            {
                link : '/',
                title: 'Dashboard',
                icon: 'dashboard'
            },
            {
                link : '',
                title: 'Storage',
                icon: 'storage'
            }
        ];
        $scope.admin = [
            {
                link : '/#users',
                title: 'Users',
                icon: 'group'
            },
            {
                link : 'showListBottomSheet($event)',
                title: 'Settings',
                icon: 'settings'
            }
        ];

        $scope.alert = 'dd';

        $scope.showAdd = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '../../views/partials/dialog/addUser.html',
                targetEvent: ev,
            })
                .then(function(answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.alert = 'You cancelled the dialog.';
                });
        };
    $scope.tagLine = 'To the moon and black !';
}]);
