angular.module('meanStarterKit').service('HttpInterceptorService', ['localStorageService', '$rootScope', 'AUTH_EVENTS', '$q', function(localStorageService, $rootScope, AUTH_EVENTS, $q) {
    var service = this;

    service.request = function(config) {
        var token = localStorageService.get('token');
        if (token) {
            config.headers.authorization = 'Bearer '+token;
        }
        return config;
    };

    service.responseError = function (response) {
        $rootScope.$broadcast({
            401: AUTH_EVENTS.notAuthenticated,
            403: AUTH_EVENTS.notAuthorized,
            419: AUTH_EVENTS.tokenExpired,
            440: AUTH_EVENTS.tokenExpired
        }[response.status], response);

        return $q.reject(response);
    }
}]);