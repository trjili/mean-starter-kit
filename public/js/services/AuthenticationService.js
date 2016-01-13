'use strict';

angular.module('meanStarterKit').factory('AuthenticationService', ['$http', '$rootScope', '$location', 'jwtHelper', 'localStorageService', function($http, $rootScope, $location, jwtHelper, localStorageService){

    return {
        login: function(username, password, result) {
            $http.post('/api/authenticate', {
                username: username,
                password: password
            }).then(function(response){
                var data = response.data;
                var token = data.token;
                localStorageService.set('token', data.token);
                result(data);
            }, function(err){
                result(err.data);
            })
        },
        isAuthenticated: function() {
            var token = this.getToken();
            if (token) {
                return true;
            } else {
                return false;
            }

        },
        getCurrentUser: function (){
            if (this.isAuthenticated()) {
                return jwtHelper.decodeToken(this.getToken());
            } else {
                return null;
            }
        },
        getToken: function () {
            return  localStorageService.get('token');
        },
        removeToken: function() {
            localStorageService.remove('token')
        },
        autoLogin: function () {
            $rootScope.userLoginIn = true;
            $rootScope.token = this.getToken();
            $rootScope.user = this.getCurrentUser();
        },
        logout: function() {
            $rootScope.userLoginIn = false;
            $rootScope.user = {};
            this.removeToken();
        }
    };

}
]);