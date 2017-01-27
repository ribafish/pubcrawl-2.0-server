/**
 * Created by Leo on 11.01.2017.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('loginController', ['$scope', '$http', 'CrawlerFac', 'EventFac', 'PubFac', '$q', function ($scope, $http, CrawlerFac, EventFac, PubFac, $q) {
            $scope.currentNavItem = 'page4';

            $scope.saveUser = function () {
                $http({
                    method: 'POST',
                    url: "http://localhost:8080/login",
                    data: $.param({user: "hallo", password: "asd"}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(response) {
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
        }])
})();


