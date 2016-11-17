/**
 * Created by Leo on 13.11.2016.
 */
(function() {
    'use strict';

    angular.module('controllers')
        .controller('homeController', ['$scope', '$http', function ($scope, $http) {
            $scope.currentNavItem = 'page1';
        }])
})();

