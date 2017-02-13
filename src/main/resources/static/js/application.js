var env = {};

// Import variables if present (from env.js)
if (window) {
    Object.assign(env, window.__env);
}

var pubApp = angular.module('pubApp', ['ngCookies', 'ngResource', 'ngRoute', 'naif.base64', 'ngMap', 'LocalStorageModule']);

pubApp.config(['$httpProvider', '$routeProvider', '$locationProvider', 'localStorageServiceProvider', function ($httpProvider, $routeProvider, $locationProvider, localStorageServiceProvider) {
    $routeProvider.when("/", {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    }).when("/create", {
        templateUrl: 'create/create.html',
        controller: 'createController'
    }).when("/event", {
        templateUrl: 'event/event.html',
        controller: 'eventController'
    }).when("/register", {
        templateUrl: 'register/register.html',
        controller: 'registerController'
    }).when("/login", {
        templateUrl: 'login/login.html',
        controller: 'loginController'
    }).when("/rethink", {
        templateUrl: 'rethink/rethink.html',
        controller: 'rethinkController'
    }).otherwise({
        controller: function () {
            window.location.replace('/');
        },
        template: "<div></div>"
    });

    localStorageServiceProvider
        .setPrefix('holy')
        .setStorageType('localStorage')
        .setNotify(true, true);

    $locationProvider.html5Mode(true);
}]);

/*pubApp.run(['$rootScope', '$location', 'CrawlerFac', function ($rootScope, $location, CrawlerFac) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if (!CrawlerFac.getAuthenticated()) {
            if (next.$$route.originalPath == '/login') {
                $location.path('/login');
                return
            }
            $location.path('/');
        }
    });
}]);*/

// Register environment in AngularJS as constant
pubApp.constant('__env', env);