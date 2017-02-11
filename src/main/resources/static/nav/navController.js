/**
 * Created by Leo on 01.02.2017.
 */
/**
 * Created by Leo on 13.11.2016.
 */
(function () {
    'use strict';
    angular.module('pubApp').controller('navController', ['localStorageService','$location', '$cookies', '$rootScope', '$scope', '$http', 'CrawlerFac', 'EventFac', function (localStorageService,$location, $cookies, $rootScope, $scope, $http, CrawlerFac, EventFac) {

        $scope.$watch(function(){return CrawlerFac.getAuthenticated()}, function() {
            $scope.authenticated = CrawlerFac.getAuthenticated();
        });

        $scope.logout = function () {
            localStorageService.set("authenticated",false);
            $http.post('/logout', {}).success(function () {
                CrawlerFac.setAuthenticated(false);
                $location.path("/");
            }).error(function (data) {
                console.log(data)
            });
        };

    }])
})();
