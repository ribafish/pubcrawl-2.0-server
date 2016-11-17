var pubApp = angular.module('pubApp', ['ngRoute', 'controllers']);

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