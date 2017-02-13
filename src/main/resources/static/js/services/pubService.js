/**
 * Created by Leo on 07.12.2016.
 */
(function(angular) {
    var pubFactory = function($resource, $rootScope) {
        var token = $rootScope.token;
        return{
            allPubs : $resource('/pubs/', {},{})
        }
    };

    pubFactory.$inject = ['$resource','$rootScope'];
    angular.module("pubApp").factory("PubFac", pubFactory);
}(angular));