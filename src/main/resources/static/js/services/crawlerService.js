(function (angular) {
    var crawlerFactory = function ($rootScope,$resource, $http) {

        var currentUser = null;

        var authenticated = false;1

        var getCurrentUser = function () {
            return currentUser
        };

        var setCurrentUser = function (User) {
            currentUser = User;
        };

        var setAuthenticated = function (value) {
            authenticated = value;
        };

        var getAuthenticated = function () {
            return authenticated;
        };

        return {
            getAuthenticated: getAuthenticated,
            setAuthenticated: setAuthenticated,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            allCrawlers: $resource('/crawlers/', {},{}),
            joinEvent: $resource('/crawlers/:userId/eventsList',{},{update: {method: 'PATCH', params: {userId: '@userId'}}})
        }
    };

    crawlerFactory.$inject = ['$rootScope','$resource', '$http'];
    angular.module("pubApp").factory("CrawlerFac", crawlerFactory);
}(angular));