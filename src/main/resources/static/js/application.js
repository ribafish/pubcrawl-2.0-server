var env = {};

// Import variables if present (from env.js)
if(window){
    Object.assign(env, window.__env);
}

var pubApp = angular.module('pubApp', ['ngResource','ngRoute','naif.base64']);

pubApp.config(['$routeProvider', '$locationProvider', function ($routeProvider ,$locationProvider) {
    $routeProvider.
    when("/", {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    }).when("/create", {
        templateUrl: 'create/create.html',
        controller: 'createController'
    }).
    otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
}]);


// Register environment in AngularJS as constant
pubApp.constant('__env', env);