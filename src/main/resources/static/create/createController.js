/**
 * Created by Leo on 14.11.2016.
 */
(function() {
    'use strict';

    angular.module('controllers')
        .controller('createController', ['$scope', '$http', function ($scope, $http) {
            $scope.currentNavItem = 'page1';
        }])
})();

