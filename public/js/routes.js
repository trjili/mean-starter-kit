angular.module('meanStarterKit').config(['$routeProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider', '$mdIconProvider', 'localStorageServiceProvider', function($routeProvider, $locationProvider, $httpProvider, $mdThemingProvider, $mdIconProvider, localStorageServiceProvider){

    // routes
    $routeProvider
        .when('/', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'IndexController'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/security/login.html',
            controllerAs: 'vm'
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UserController'
        });

    // html5 mode
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    // angular material config
    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('purple');

    $mdIconProvider
        .icon("search", "../img/svg/search.svg" , 24)
        .icon("add", "../img/svg/add.svg", 24)
        .fontSet('font-icons', 'material-icons');

    // local storage config
    localStorageServiceProvider
        .setPrefix('mean');

    // http interceptor
    $httpProvider.interceptors.push('HttpInterceptorService');
}])
.run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if ($rootScope.userLoginIn == null) {
            // no logged user, redirect to /login
            if ( next.templateUrl === "views/security/login.html") {
            } else {
                $location.path("/login");
            }
        }
    });
});