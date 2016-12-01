/**
 * Created by Leo on 13.11.2016.
 */
(function () {
    'use strict';
    angular.module('pubApp').controller('homeController', ['$scope', '$http', 'CrawlerFac', function ($scope, $http, CrawlerFac) {
        $scope.currentNavItem = 'page1';
        CrawlerFac.get(function (response) {
            $scope.crawler = response;
        });
        $http({
            method: 'GET',
            url: '/hello'
        }).then(function successCallback(response) {
            console.log(response);
            $scope.greeting = response;
        }, function errorCallback(response) {
            console.log("Help");
        });
       }])
})();
