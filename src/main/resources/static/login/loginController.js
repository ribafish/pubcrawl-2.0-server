/**
 * Created by Leo on 11.01.2017.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('loginController', ['$window', '$location', 'CrawlerFac', 'localStorageService', '$http', function ($window, $location, CrawlerFac, localStorageService, $http) {

            /*because google redirects here we have to send the user to home and reload the page to recieve the data TODO!*/
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
                /*intial call to a secured url which will lead to a redirect to the google login page ugly...*/
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


