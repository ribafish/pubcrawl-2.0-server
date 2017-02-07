(function (angular) {
    var crawlerFactory = function ($resource, $http, $location) {

        var currentUser = null;

        var authenticated = false;

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
            setUser: function () {
                $http({
                    method: 'GET',
                    url: "https://134.158.74.243:8443/user",
                }).then(function successCallback(response) {
                    currentUser = response.data;
                    setAuthenticated(true);
                    $location.path('/');
                }, function errorCallback(response) {
                    location.reload();

                });
            },
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            allCrawlers: $resource('/crawlers/', {}),
            joinEvent: $resource('/crawlers/:userId/eventsList',
                {},
                {update: {method: 'PATCH', params: {userId: '@userId'}}})
        }
    };

    crawlerFactory.$inject = ['$resource', '$http', '$location'];
    angular.module("pubApp").factory("CrawlerFac", crawlerFactory);
}(angular));