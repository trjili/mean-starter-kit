'use strict';

angular.module('meanStarterKit').factory('AuthenticationService', ['$http', '$rootScope', '$location', 'jwtHelper', 'localStorageService', function($http, $rootScope, $location, jwtHelper, localStorageService){

    return {
        login: function(username, password, callback) {
            $http.post('/api/authenticate', {
                username: username,
                password: password
            }).then(function(response){
                var data = response.data;
                var token = data.token;
                localStorageService.set('token', data.token);
                $rootScope.userLoginIn = true;
                $rootScope.token = localStorageService.get('token');
                $rootScope.user = jwtHelper.decodeToken($rootScope.token);
                callback(true);
            }, function(err){
                $rootScope.userLoginIn = false;
                $rootScope.user = {};
                $rootScope.errLogin = err;
                callback(false);
            })
        },
        isAuthenticated: function() {
            var token = localStorageService.get('token');
            if (token) {
                console.log(jwtHelper.decodeToken(token));
                //return jwtHelper.decodeToken(token);
                return true;
            } else {
                return false;
            }

        },
        getCurrentUser: function (){

        },
        isAuthorized: function(authorizedRoles) {

        },
        getToken: function () {
            return  localStorageService.get('token');
        },
        autoLogin: function () {
            $rootScope.userLoginIn = true;
            $rootScope.token = localStorageService.get('token');
            $rootScope.user = jwtHelper.decodeToken($rootScope.token);
        }
    };

}
]);