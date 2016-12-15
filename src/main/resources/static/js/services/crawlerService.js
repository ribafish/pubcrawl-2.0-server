(function(angular) {
    var crawlerFactory = function($resource) {

        var currentUser = []

        var getCurrentUser = function () {
            return currentUser
        };

        var setCurrentUser = function (User) {
            currentUser = User;
        };

        return{
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser,
            allCrawlers : $resource('/crawlers/', {}),
            joinEvent : $resource('/crawlers/:userId/eventsList',
                {},
                { update: { method: 'PATCH', params: {userId: '@userId'}}})
        }
    };

    crawlerFactory.$inject = ['$resource'];
    angular.module("pubApp").factory("CrawlerFac", crawlerFactory);
}(angular));