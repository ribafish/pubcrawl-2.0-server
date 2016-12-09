(function(angular) {
    var crawlerFactory = function($resource) {
        return{
            allCrawlers : $resource('/crawlers/', {}),
            joinEvent : $resource('/crawlers/:userId/eventsList',
                {},
                { update: { method: 'PATCH', params: {userId: '@userId'}}})
        }
    };

    crawlerFactory.$inject = ['$resource'];
    angular.module("pubApp").factory("CrawlerFac", crawlerFactory);
}(angular));