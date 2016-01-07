angular.module('meanStarterKit').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', '$mdIconProvider', function($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider){

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
        })
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
        .fontSet('font-icons', 'material-icons')
}]);