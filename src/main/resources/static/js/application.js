var env = {};

// Import variables if present (from env.js)
if(window){
    Object.assign(env, window.__env);
}

var pubApp = angular.module('pubApp', ['ngResource','ngRoute','naif.base64','ngMap','LocalStorageModule']);

pubApp.config(['$routeProvider', '$locationProvider','localStorageServiceProvider', function ($routeProvider ,$locationProvider,localStorageServiceProvider) {
    $routeProvider.
    when("/", {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    }).
    when("/create", {
        templateUrl: 'create/create.html',
        controller: 'createController'
    }).
    when("/event", {
        templateUrl: 'event/event.html',
        controller: 'eventController'
    }).
    when("/register", {
        templateUrl: 'register/register.html',
        controller: 'registerController'
    }).
    when("/login", {
        templateUrl: 'login/login.html',
        controller: 'loginController'
    }).
    otherwise({
        redirectTo: '/'
    });

    localStorageServiceProvider
        .setPrefix('holy')
        .setStorageType('localStorage')
        .setNotify(true, true);

    $locationProvider.html5Mode(true);
}]);


// Register environment in AngularJS as constant
pubApp.constant('__env', env);