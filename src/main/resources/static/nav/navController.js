/**
 * Created by Leo on 01.02.2017.
 */
/**
 * Created by Leo on 13.11.2016.
 */
(function () {
    'use strict';
    angular.module('pubApp').controller('navController', ['$window', 'localStorageService', '$location', '$cookies', '$rootScope', '$scope', '$http', 'CrawlerFac', 'EventFac', function ($window, localStorageService, $location, $cookies, $rootScope, $scope, $http, CrawlerFac, EventFac) {

        $scope.$watch(function () {
            return CrawlerFac.getAuthenticated()
        }, function () {
            $scope.authenticated = CrawlerFac.getAuthenticated();
        });

        $scope.login = function () {
            $http({
                method: 'GET',
                url: __env.apiUrl + "login"
            }).then(function successCallback(response) {
                console.log(response)
            }, function errorCallback(response) {
                location.reload();
            });
        };


        $scope.logout = function () {
            localStorageService.set("authenticated", false);
            CrawlerFac.setAuthenticated(false);
            CrawlerFac.setCurrentUser(null);
            localStorageService.set("token", false);
            $http.defaults.headers.common.Authorization = null;
            $http.post('/logout', {}).success(function () {
                $location.path("/");
            }).error(function (data) {
                console.log(data)
            });
        };

    }])
})();
