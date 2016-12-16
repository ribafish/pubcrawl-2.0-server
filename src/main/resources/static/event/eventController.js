/**
 * Created by Leo on 14.11.2016.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('eventController', ['$scope', '$http', 'CrawlerFac', 'EventFac', 'PubFac', 'localStorageService', function ($scope, $http, CrawlerFac, EventFac, PubFac, localStorageService) {

            $scope.event = [];
            $scope.wayPoints = [];

            var setWaypoints = function () {
                if ($scope.event.timeslotList === null ||$scope.event.timeslotList.length == 0 ) {
                    return null;
                }else{
                    $http({
                        method: 'GET',
                        url: String($scope.event.timeslotList[0].pubId)
                    }).then(function successCallback(response) {
                        $scope.startPub = {lat: response.data.lat, lng: response.data.lng};
                    }, function errorCallback(response) {
                        console.log("Setting Stratpub Problem" + response);
                    });

                    $http({
                        method: 'GET',
                        url: String($scope.event.timeslotList[$scope.event.timeslotList.length - 1].pubId)
                    }).then(function successCallback(response) {
                        $scope.endPub = {lat: response.data.lat, lng: response.data.lng};
                    }, function errorCallback(response) {
                        console.log("Setting Endpub Problem" + response);
                    });

                    for (var i = 1; i < $scope.event.timeslotList.length - 1; i++) {
                        $http({
                            method: 'GET',
                            url: String($scope.event.timeslotList[i].pubId)
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

            var init = function () {

                $(document).ready(function () {
                    $('.collapsible').collapsible();
                });


                var toLocal = function (key, value) {
                    return localStorageService.set(key, value);
                };

                var fromLocal = function (key) {
                    return localStorageService.get(key)
                };

                $scope.currentNavItem = 'page3';
                if (EventFac.getCurrentEvent() == null) {
                    $scope.event = fromLocal("eve");
                    setWaypoints();
                } else {
                    $scope.event = EventFac.getCurrentEvent();
                    toLocal("eve", $scope.event);
                    setWaypoints();
                }

                EventFac.getter($scope.event._links.participantsList.href).then(function (result) {
                    $scope.participants = result._embedded.crawlers;
                });

                EventFac.getter($scope.event._links.pubsList.href).then(function (result) {
                    $scope.pubs = result._embedded.pubs;
                });
            };
            init();
        }
        ])
})();


