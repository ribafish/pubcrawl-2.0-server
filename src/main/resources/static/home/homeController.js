/**
 * Created by Leo on 13.11.2016.
 */
(function () {
    'use strict';
})();
angular.module('pubApp').controller('homeController', ['$interval', '$window', '$timeout', 'localStorageService', '$location', '$cookies', '$rootScope', '$scope', '$http', 'CrawlerFac', 'EventFac', function ($interval, $window, $timeout, localStorageService, $location, $cookies, $rootScope, $scope, $http, CrawlerFac, EventFac) {
    $scope.allEvent = [];

    $scope.myEvents = [];
    $scope.myPubs = [];


    $scope.notauthenticted = true;
/*    if (localStorageService.get("authenticated") == false) {
        EventFac.allEvents.get().$promise.then(function (data) {
            $scope.allEvent = data._embedded.events;
        });
    }*/

    if (localStorageService.get("authenticated") == true && CrawlerFac.getAuthenticated() == false) {
        $http({
            method: 'GET',
            url: __env.apiUrl + "/user"
        }).then(function successCallback(response) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.details.tokenValue;
            CrawlerFac.setCurrentUser(response.data.userAuthentication);
            localStorageService.set("token", true);
        }, function errorCallback(response) {
            console.log(response)
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
                    if (user.details.id === openCrawlers[i].profileID) {
                        CrawlerFac.setCurrentUser(openCrawlers[i]);
                        CrawlerFac.setAuthenticated(true);
                        $scope.notauthenticted = false;
                        Materialize.toast('Welcome back ' + openCrawlers[i].userName + '!!', 1000);
                        return;
                    } else if (i === openCrawlers.length - 1) {
                        var crawlerToSave = {
                            userName: user.details.name,
                            profileID: user.details.id,
                            userImage: user.details.picture
                        };
                        CrawlerFac.allCrawlers.save(crawlerToSave).$promise.then(function (data) {
                            Materialize.toast('Welcome to Pubcrawl2.0 ' + user.details.name + '!!', 1000);
                            CrawlerFac.setAuthenticated(true);
                            $scope.notauthenticted = false;
                            CrawlerFac.allCrawlers.get().$promise.then(function (data) {
                                var openCrawlers = data._embedded.crawlers;
                                var user = CrawlerFac.getCurrentUser();
                                for (var i = 0; i < openCrawlers.length; i++) {
                                    if (user.details.id === openCrawlers[i].profileID) {
                                        CrawlerFac.setCurrentUser(openCrawlers[i]);
                                    }
                                }
                            })
                        });
                    }
                }
                if (openCrawlers.length === 0) {
                    var crawlerToSave = {
                        userName: user.details.name,
                        profileID: user.details.id,
                        userImage: user.details.picture
                    };
                    CrawlerFac.allCrawlers.save(crawlerToSave).$promise.then(function (data) {
                        Materialize.toast('Welcome to Pubcrawl2.0 ' + user.details.name + '!!', 1000);
                        CrawlerFac.setAuthenticated(true);
                        $scope.notauthenticted = false;
                    });
                    CrawlerFac.setCurrentUser(crawlerToSave);
                }
            });
        }
    });


    $scope.$watch(function () {
        return CrawlerFac.getAuthenticated()
    }, function () {
        if (CrawlerFac.getAuthenticated() == true) {
            $scope.notauthenticted = false;
            EventFac.allEvents.get().$promise.then(function (data) {
                $http({
                    method: 'GET',
                    url: String(CrawlerFac.getCurrentUser()._links.ownEvents.href)
                }).then(function successCallback(response) {
                    if(response.data._embedded.events.length==0){
                        $scope.allEvent = data._embedded.events;
                    }else{
                        data._embedded.events.forEach(function (event) {
                            for (var k = 0; k <= response.data._embedded.events.length-1;k++) {
                                if (response.data._embedded.events[k]._links.event.href === event._links.event.href) {
                                    $scope.myEvents.push(event);
                                    break;
                                }
                                if(k === response.data._embedded.events.length-1) {
                                    $scope.allEvent.push(event);
                                }
                            }
                        })
                    }
                }, function errorCallback(response) {
                    console.log("NO events " + response);
                });
            });
            $http({
                method: 'GET',
                url: String(CrawlerFac.getCurrentUser()._links.ownPubs.href)
            }).then(function successCallback(response) {
                response.data._embedded.pubs.forEach(function (pub) {
                    $scope.myPubs.push(pub);
                })
            }, function errorCallback(response) {
                console.log("no pubs " + response);
            });
            $scope.authenticated = CrawlerFac.getAuthenticated();
        }
    });

    $scope.deletePub = function (link) {
        $scope.myPubs.forEach(function (pub) {
            if (pub._links.self.href === link) {
                $scope.myPubs.splice($scope.myPubs.indexOf(pub), 1);
            }
        });
        $http({
            method: 'DELETE',
            url: String(link)
        }).then(function successCallback(response) {
            Materialize.toast('Pub deleted!', 1000);
            console.log(response)
        }, function errorCallback(response) {
            console.log("Delelting failed " + response);
        });
    };

    $scope.deleteEve = function (link) {
        $scope.myEvents.forEach(function (event) {
            if (event._links.self.href === link) {
                $scope.myEvents.splice($scope.myEvents.indexOf(event), 1);
            }
        });
        $http({
            method: 'DELETE',
            url: String(link)
        }).then(function successCallback(response) {
            Materialize.toast('Event deleted', 1000);
        }, function errorCallback(response) {
            console.log("Delelting failed " + response);
        });
    };

    $scope.setCurrentEvent = function (event) {
        $scope.allEvent.forEach(function (value) {
            if (value._links.self.href == event) {
                EventFac.setCurrentEvent(value)
            }
        });
    };
    $scope.setCurrentEvent2 = function (event) {
        $scope.myEvents.forEach(function (value) {
            if (value._links.self.href == event) {
                EventFac.setCurrentEvent(value)
            }
        });
    };

}]);
