angular.module('meanStarterKit').service('HttpInterceptorService', function($rootScope) {
    var service = this;

    service.request = function(config) {
        var token = $rootScope.userLoginIn ? $rootScope.token : null;

        if (token) {
            config.headers.authorization = token;
        }
        return config;
    };

    service.responseError = function(response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    }
});