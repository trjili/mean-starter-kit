'use strict';

angular.module('meanStarterKit').factory('AuthenticationService', ['$http', '$rootScope', '$location', 'localStorageService', '$window', function($http, $rootScope, $location, localStorageService, $window){

    return {
        login : function(username, password) {
            console.log('auth service');
            $http.post('/api/authenticate', {
                username: username,
                password: password
            }).then(successLogin, errorLogin)
        },
        isAuthenticated: function() {
            var token = localStorageService.get('token');
            return checkJwtToken(token);

        },
        autoLogin: function () {
        $rootScope.userLoginIn = true;
        },
        isAuthorized: function(authorizedRoles) {

        }
    };

    function successLogin(response){
        var data = response.data;
        $rootScope.user = data.user;
        $rootScope.userLoginIn = true;
        $rootScope.token = data.token;
        localStorageService.set('token', data.token);
        $location.path('/');
    }

    function errorLogin(err){
        $rootScope.userLoginIn = false;
        $rootScope.user = {};
        $rootScope.errLogin = err;
    }

    function checkJwtToken(token){
        if(token) {
            var params = parseToken(token);
            return Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
            return false;
        }
    }

    function parseToken(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
    }
}
]);