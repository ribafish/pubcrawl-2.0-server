/**
 * Created by Leo on 13.11.2016.
 */
(function () {
    'use strict';
})();
angular.module('pubApp').controller('homeController', ['$timeout', 'localStorageService', '$location', '$cookies', '$rootScope', '$scope', '$http', 'CrawlerFac', 'EventFac', function ($timeout, localStorageService, $location, $cookies, $rootScope, $scope, $http, CrawlerFac, EventFac) {
    $scope.currentNavItem = 'page1';
    $scope.allEvent = [];

    if (localStorageService.get("authenticated") == true && CrawlerFac.getAuthenticated() == true) {
        EventFac.allEvents.get().$promise.then(function (data) {
            $scope.allEvent = data._embedded.events;
        });
    }


    if (localStorageService.get("authenticated") == true && CrawlerFac.getAuthenticated() == false) {
        $http({
            method: 'GET',
            url: __env.apiUrl + "user"
        }).then(function successCallback(response) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.details.tokenValue;
            CrawlerFac.setCurrentUser(response.data.userAuthentication);
            localStorageService.set("token", true);
        }, function errorCallback(response) {
            location.reload();
        });
    }

    $scope.$watch(function () {
        return localStorageService.get("token");
    }, function () {
        if (localStorageService.get("token") == true && CrawlerFac.getAuthenticated() == false) {
            CrawlerFac.allCrawlers.get().$promise.then(function (data) {
                var openCrawlers = data._embedded.crawlers;
                var user = CrawlerFac.getCurrentUser();
                for (var i = 0; i < openCrawlers.length; i++) {
                    if (user.details.profile === openCrawlers[i].profile) {
                        CrawlerFac.setCurrentUser(openCrawlers[i]);
                        CrawlerFac.setAuthenticated(true);
                        Materialize.toast('Welcome back ' + openCrawlers[i].userName + '!!', 1000);
                    } else if (i === openCrawlers.length - 1) {
                        var crawlerToSave = {
                            userName: user.name,
                            profile: user.details.profile,
                            userImage: user.details.picture
                        };
                        CrawlerFac.allCrawlers.save(crawlerToSave).$promise.then(function (data) {
                            Materialize.toast('Welcome to Pubcrawl2.0' + user.name + '!!', 1000);
                            CrawlerFac.setAuthenticated(true);
                        });
                        CrawlerFac.setCurrentUser(crawlerToSave);
                    }
                }
                if (openCrawlers.length === 0) {
                    var crawlerToSave = {
                        userName: user.name,
                        profile: user.details.profile,
                        userImage: user.details.picture
                    };
                    CrawlerFac.allCrawlers.save(crawlerToSave).$promise.then(function (data) {
                        Materialize.toast('Welcome to Pubcrawl2.0' + user.name + '!!', 1000);
                        CrawlerFac.setAuthenticated(true);
                    });
                    CrawlerFac.setCurrentUser(crawlerToSave);
                }
            });
        }
    });


    $scope.$watch(function () {
        return CrawlerFac.getAuthenticated()
    }, function () {
        $scope.authenticated = CrawlerFac.getAuthenticated();
    });

    $scope.setCurrentEvent = function (event) {
        $scope.allEvent.forEach(function (value) {
            if (value._links.self.href == event) {
                EventFac.setCurrentEvent(value)
            }
        });
    };

    $scope.credentials = {};

    /*        $http({
     method: 'GET',
     url: '/hello'
     }).then(function successCallback(response) {
     $scope.greeting = response;
     }, function errorCallback(response) {
     console.log("Help");
     });*/

    /*
     $http({
     method: 'GET',
     url: __env.apiUrl + 'image/crawler/1'
     }).then(function successCallback(response) {
     $scope.image = response.data;
     }, function errorCallback(response) {
     console.log("Picture couldnt load");
     });
     */


    /*        $scope.submit = function () {
     $http({
     method: 'POST',
     url: __env.apiUrl + 'image/crawler/1',
     data: $scope.image.base64
     }).then(function successCallback(response) {
     console.log(response);
     }, function errorCallback(response) {
     console.log("Help");
     });
     }*/
}])
