angular.module('meanStarterKit').controller('loginController', LoginController);

LoginController.$inject = ['$location'];
function LoginController($location) {
    var vm = this;
    vm.login = login;
    function login() {
        vm.dataLoading = true;
        $location.path('/');
    };
}