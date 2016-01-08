'use strict';

angular.module('meanStarterKit').factory('AuthenticationService', ['$http', '$rootScope', '$location', 'localStorageService', function($http, $rootScope, $location, localStorageService){

    return {
        login : function(username, password) {
            console.log('auth service');
            $http.post('/api/authenticate', {
                username: username,
                password: password
            }).then(successLogin, errorLogin)
        }
    };

    function successLogin(response){
        console.log(response);
        var data = response.data;
        $rootScope.user = data.user;
        $rootScope.userLoginIn = true;
        console.log(data.token);
        localStorageService.set('token', data.token);
        $location.path('/');
    }

    function errorLogin(err){
        $rootScope.userLoginIn = false;
        $rootScope.user = {};
        $rootScope.errLogin = err;
    }
}
]);