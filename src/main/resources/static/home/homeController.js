/**
 * Created by Leo on 13.11.2016.
 */
(function () {
    'use strict';
    angular.module('pubApp').controller('homeController', ['$scope', '$http', 'CrawlerFac', function ($scope, $http, CrawlerFac) {
        $scope.currentNavItem = 'page1';
        CrawlerFac.allCrawlers.get(function (response) {
            $scope.crawler = response;
        });
        $http({
            method: 'GET',
            url: '/hello'
        }).then(function successCallback(response) {
            $scope.greeting = response;
        }, function errorCallback(response) {
            console.log("Help");
        });

        $http({
            method: 'GET',
            url: __env.apiUrl + 'image/1'
        }).then(function successCallback(response) {
            $scope.image = response.data;
        }, function errorCallback(response) {
            console.log("Help");
        });


        $scope.submit = function () {
            $http({
                method: 'POST',
                url: __env.apiUrl + 'image/1',
                data: $scope.image.base64
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log("Help");
            });
        }
    }])
})();
