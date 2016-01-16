angular.module('meanStarterKit').constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    tokenExpired: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
}).constant('USER_ROLES', {
    ADMIN: 'Admin',
    USER: 'User'
});