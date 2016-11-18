(function(angular) {
    var crawlerFactory = function($resource) {
        return $resource('/crawlers/', {

        }, {
            update: {
                method: "PUT"
            },
            remove: {
                method: "DELETE"
            },
            get : {
                method: "GET"
            }
        });
    };

    crawlerFactory.$inject = ['$resource'];
    angular.module("pubApp").factory("CrawlerFac", crawlerFactory);
}(angular));