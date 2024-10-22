/**
 * Created by Leo on 13.11.2016.
 */
(function () {
    'use strict';
})();
angular.module('pubApp').controller('homeController', ['$interval', '$window', '$timeout', 'localStorageService', '$location', '$cookies', '$rootScope', '$scope', '$http', 'CrawlerFac', 'EventFac', function ($interval, $window, $timeout, localStorageService, $location, $cookies, $rootScope, $scope, $http, CrawlerFac, EventFac) {

    /*initialize some materialize componentes*/
    $(document).ready(function(){
        $('.carousel').carousel();
        $('.carousel.carousel-slider').carousel({fullWidth: true});
        $('ul.tabs').tabs();
    });

    /*making sure only the right tab is displayed*/
    $scope.currentTub = 3;
    $scope.changeTab = function (data) {
        $scope.currentTub = data;
    };

    /*scopes to use in template*/
    $scope.allEvent = [];
    $scope.myEvents = [];
    $scope.myPubs = [];
    $scope.joinedEvents = [];
    $scope.notauthenticted = true;

    /*getting the principal of an authenticated user*/
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

    /*react after the token key changed to set the current user and if he is new create a new crawler*/
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


    /*getting data if the user is authenticated means all events, joined events, own events and own pubs*/
    $scope.$watch(function () {
        return CrawlerFac.getAuthenticated()
    }, function () {
        if (CrawlerFac.getAuthenticated() == true) {
            $scope.notauthenticted = false;
            EventFac.allEvents.get().$promise.then(function (data) {
                data._embedded.events.forEach(function (event) {
                    $scope.allEvent.push(event);
                })
            });
            $http({
                method: 'GET',
                url: String(CrawlerFac.getCurrentUser()._links.ownEvents.href)
            }).then(function successCallback(response) {
                response.data._embedded.events.forEach(function (sadeevent) {
                    $scope.myEvents.push(sadeevent);
                    })
            },function errorCallback(response) {
                console.log("no Ownevents " + response);
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
            $http({
                method: 'GET',
                url: String(CrawlerFac.getCurrentUser()._links.eventsList.href)
            }).then(function successCallback(response) {
                response.data._embedded.events.forEach(function (event) {
                    $scope.joinedEvents.push(event);
                })
            }, function errorCallback(response) {
                console.log("no joinedevents " + response);
            });
            $scope.authenticated = CrawlerFac.getAuthenticated();
        }
    });

    /*delete a pub*/
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

    /*delete an event*/
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


    /*all methods are used to set the event which will be displayed in the eventview should be done with rest!*/
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

    $scope.setCurrentEvent3 = function (event) {
        $scope.joinedEvents.forEach(function (value) {
            if (value._links.self.href == event) {
                EventFac.setCurrentEvent(value)
            }
        });
    };

}]);
