/**
 * Created by Leo on 11.01.2017.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('loginController', ['CrawlerFac','localStorageService','$http', function (CrawlerFac,localStorageService,$http) {
            $http({
                method: 'GET',
                url: __env.apiUrl + "/callGoogle",
            }).then(function successCallback(response) {
               console.log(response)
            }, function errorCallback(response) {
                location.reload();
            });
            localStorageService.set("authenticated", true);
        }])
})();


