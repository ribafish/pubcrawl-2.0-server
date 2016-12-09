/**
 * Created by Leo on 07.12.2016.
 */
(function(angular) {
    var pubFactory = function($resource) {
        return{
            allPubs : $resource('/pubs/', {})
        }
    };

    pubFactory.$inject = ['$resource'];
    angular.module("pubApp").factory("PubFac", pubFactory);
}(angular));