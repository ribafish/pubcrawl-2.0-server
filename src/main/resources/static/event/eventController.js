/**
 * Created by Leo on 14.11.2016.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('eventController', ['$location', '$scope', '$http', 'CrawlerFac', 'EventFac', 'PubFac', 'localStorageService', function ($location, $scope, $http, CrawlerFac, EventFac, PubFac, localStorageService) {


            if (CrawlerFac.getAuthenticated() == false) {
                $location.path("/");
            }

            $scope.event = [];
            $scope.wayPoints = [];

            $scope.owner = false;

            var setWaypoints = function () {
                if ($scope.event.timeslotList === null || $scope.event.timeslotList.length == 0) {
                    return null;
                } else {
                    $http({
                        method: 'GET',
                        url:__env.apiUrl + "/pubs/" + String($scope.event.timeslotList[0].pubId)
                    }).then(function successCallback(response) {
                        $scope.startPub = {lat: response.data.lat, lng: response.data.lng};
                    }, function errorCallback(response) {
                        console.log("Setting Stratpub Problem" + response);
                    });

                    $http({
                        method: 'GET',
                        url:__env.apiUrl + "/pubs/" + String($scope.event.timeslotList[$scope.event.timeslotList.length - 1].pubId)
                    }).then(function successCallback(response) {
                        $scope.endPub = {lat: response.data.lat, lng: response.data.lng};
                    }, function errorCallback(response) {
                        console.log("Setting Endpub Problem" + response);
                    });

                    for (var i = 1; i < $scope.event.timeslotList.length - 1; i++) {
                        $http({
                            method: 'GET',
                            url: __env.apiUrl + "/pubs/" + String($scope.event.timeslotList[i].pubId)
                        }).then(function successCallback(response) {
                            $scope.wayPoints.push({
                                location: {lat: response.data.lat, lng: response.data.lng},
                                stopover: true
                            });
                            //console.log($scope.wayPoints)
                        }, function errorCallback(response) {
                            console.log("Timeslotloopproblem " + response);
                        });
                    }
                }

            };

            $scope.leavePubcrawl = function () {
                $http({
                    method: 'GET',
                    url: String(CrawlerFac.getCurrentUser()._links.eventsList.href),
                }).then(function successCallback(response) {
                    var array = [];
                    for (var i = 0; i <= response.data._embedded.events.length - 1; i++) {
                        if (i == response.data._embedded.events.length - 1) {
                            if (response.data._embedded.events[i]._links.event.href != $scope.event._links.event.href) {
                                array.push(response.data._embedded.events[i]._links.event.href)
                            }
                            $http({
                                method: 'PUT',
                                url: String(CrawlerFac.getCurrentUser()._links.eventsList.href),
                                data: {
                                    _links: {
                                        href: array
                                    }
                                }
                            });
                            Materialize.toast('Successfully left Pubcrawl', 1000);
                        } else {
                            if (response.data._embedded.events[i]._links.event.href != $scope.event._links.event.href)
                            {array.push(response.data._embedded.events[i]._links.event.href)}
                        }
                    }

                }, function errorCallback(response) {
                    console.log("Joining Pub Problem" + response);
                });
            };

            $scope.enterPubcrawl = function () {
                $http({
                    method: 'PATCH',
                    url: String(CrawlerFac.getCurrentUser()._links.eventsList.href),
                    data: {
                        _links: {
                            href: $scope.event._links.event.href
                        }
                    }
                }).then(function successCallback(response) {
                    Materialize.toast('Yayy you joined the Pubcrawl', 1000);
                }, function errorCallback(response) {
                    console.log("Entering Problem " + response);
                });
            };

            var init = function () {

                $(document).ready(function () {
                    $('.collapsible').collapsible();
                    $('.chips').material_chip();
                });

                var toLocal = function (key, value) {
                    return localStorageService.set(key, value);
                };

                var fromLocal = function (key) {
                    return localStorageService.get(key)
                };

                if (EventFac.getCurrentEvent() == null) {
                    $scope.event = fromLocal("eve");
                    setWaypoints();
                } else {
                    $scope.event = EventFac.getCurrentEvent();
                    toLocal("eve", $scope.event);
                    $http({
                        method: 'GET',
                        url: String($scope.event._links.eventOwner.href)
                    }).then(function successCallback(response) {
                        $scope.event.eventOwner = response.data;
                    }, function errorCallback(response) {
                        console.log("NO EVENTOWNSER " + response);
                    });
                    setWaypoints();
                }

                EventFac.getter($scope.event._links.participantsList.href).then(function (result) {
                    $scope.participants = result._embedded.crawlers;
                    $scope.participants.forEach(function (user) {
                        if (CrawlerFac.getCurrentUser().userName == user.userName) {
                            $scope.owner = true;
                        }
                    })
                });

                EventFac.getter($scope.event._links.pubsList.href).then(function (result) {
                    $scope.pubs = result._embedded.pubs;
                });
            };
            init();
        }
        ])
})();


