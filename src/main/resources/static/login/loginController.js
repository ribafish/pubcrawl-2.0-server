/**
 * Created by Leo on 11.01.2017.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('loginController', ['$window', '$location', 'CrawlerFac', 'localStorageService', '$http', function ($window, $location, CrawlerFac, localStorageService, $http) {
            if (localStorageService.get("authenticated") == true) {
                console.log(window.location.href);
                $http({
                    method: 'GET',
                    url: window.location.href
                }).then(function successCallback(response) {
                    $location.path("/")
                    $window.location.reload();
                }, function errorCallback(response) {
                    location.reload();
                });
            } else {
                localStorageService.set("authenticated", true);
                $http({
                    method: 'GET',
                    url: __env.apiUrl + "callGoogle",
                }).then(function successCallback(response) {
                    console.log(response)
                }, function errorCallback(response) {
                    location.reload();
                });
            }


        }])
})();


