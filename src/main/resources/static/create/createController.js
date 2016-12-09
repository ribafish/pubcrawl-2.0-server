/**
 * Created by Leo on 14.11.2016.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('createController', ['$scope', '$http', 'CrawlerFac', 'EventFac', 'PubFac', function ($scope, $http, CrawlerFac, EventFac, PubFac) {
            $scope.currentNavItem = 'page1';

            /*Basic Variables we will need to get the Data from Forms and Google maps*/

            $scope.event =
            {
                eventName: null,
                date: new Date(),
                description: null,
                tracked: false,
                timeslotList: []
            };

            $scope.openPubs = [];
            $scope.usedPubs = [];

            $scope.openCrawlers = [];
            $scope.usedCrawlers = [];


            $scope.wayPoints = [];

            $scope.startPub = null;
            $scope.endPub = null;

            $scope.timer = {
                startingTime: new Date(0, 0, 0, 0, 0, 0),
                endingTime: new Date(0, 0, 0, 0, 0, 0)
            };


            /*Using the REST Controller to get Data from DB and save it*/


            CrawlerFac.allCrawlers.get().$promise.then(function (data) {
                $scope.openCrawlers = data._embedded.crawlers;
            });

            PubFac.allPubs.get().$promise.then(function (data) {
                $scope.openPubs = data._embedded.pubs;
            });


            $scope.uploadUser = function () {
                $scope.usedCrawlers.forEach(function (crawler) {
                    $http({
                        method: 'PATCH',
                        url: String(crawler._links.eventsList.href),
                        data: {
                            _links: {
                                href: "http://localhost:8080/events/6"/*$scope.event._links.self.href*/
                            }
                        }
                    }).then(function successCallback(response) {
                        console.log(response);
                    }, function errorCallback(response) {
                        console.log("Help" + response);
                    });
                });
                $scope.usedCrawlers=[];
            };




            $scope.saveEvent = function () {
                EventFac.allEvents.save($scope.event).$promise.then(function (data) {
                    $scope.event = data;
                    console.log($scope.event._links.self.href);
                });
            };

            $scope.savePubs = function () {
                EventFac.allEvents.save($scope.event).$promise.then(function (data) {
                });
            };


            /*Diverse Helpers to get things going*/
            $(document).ready(function () {
                $('.parallax').parallax();
                $('.scrollspy').scrollSpy();
            });


            window.picker = $('.datepicker').pickadate({
                selectYears: 16,
                format: 'yyyy-mm-dd'
            });

            $scope.$on('mapInitialized', function (event, map) {
                $scope.objMapa = map;
            });


            /*Main Methods*/

            var geocodeLatLng = function (value) {
                var geocoder = new google.maps.Geocoder;
                var latlng = {lat: value.lat, lng: value.lng};
                geocoder.geocode({'location': latlng}, function (results, status) {
                    if (status === 'OK') {
                        if (results[1]) {
                            /*                            console.log(results[1].formatted_address);*/
                            $scope.adressPub = results[1].formatted_address;
                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            };

            $scope.showInfoWindow = function (event, mark) {
                var infowindow = new google.maps.InfoWindow();
                var center = new google.maps.LatLng(mark.lat, mark.lng);

                infowindow.setContent(
                    '<table><tbody><tr><td><h6>' + mark.pubName + '</h6></td><td></td></tr><tr><td>Prices: ' + mark.prices + '</td><td></td></tr><tr><td>Rating: ' + mark.rating + '</td><td><a class="waves-effect waves-light btn" ng-click="deleteFromOpens(' + mark + ')">add</a></td></tr></tbody></table>'
                );

                infowindow.setPosition(center);
                infowindow.open($scope.objMapa);
            };


            $scope.addCrawler = function (crawler) {
                var index = $scope.openCrawlers.indexOf(crawler);
                $scope.openCrawlers.splice(index, 1);
                $scope.usedCrawlers.push(crawler);
            };

            $scope.delCrawler = function (crawler) {
                var index = $scope.usedCrawlers.indexOf(crawler);
                $scope.usedCrawlers.splice(index, 1);
                $scope.openCrawlers.push(crawler);
            };


            $scope.deleteFromOpens = function (value) {
                var index = $scope.openPubs.indexOf(value);
                $scope.openPubs.splice(index, 1);
                $scope.usedPubs.push(value);
                geocodeLatLng(value);
                $scope.event.timeslotList.push({startingTime: null, endingTime: null, pubId: value._links.self.href});
                if ($scope.startPub == null) {
                    $scope.startPub = {lat: value.lat, lng: value.lng};
                } else {
                    if ($scope.endPub == null) {
                        $scope.endPub = {lat: value.lat, lng: value.lng};
                    } else {
                        //console.log($scope.wayPoints);
                        $scope.wayPoints.push({
                            location: {lat: $scope.endPub.lat, lng: $scope.endPub.lng},
                            stopover: true
                        });
                        $scope.endPub = {lat: value.lat, lng: value.lng};
                    }
                }
            };

            $scope.deleteFromUsed = function (value) {
                var index = $scope.usedPubs.indexOf(value);
                $scope.usedPubs.splice(index, 1);
                $scope.openPubs.push(value);
                if ($scope.startPub.lat == value.lat && $scope.startPub.lng == value.lng) {
                    if ($scope.wayPoints.length != 0) {
                        $scope.startPub = {
                            lat: $scope.wayPoints[0].location.lat,
                            lng: $scope.wayPoints[0].location.lng
                        };
                        $scope.wayPoints.splice(0, 1);
                    } else if ($scope.endPub != null) {
                        $scope.startPub = $scope.endPub;
                        $scope.endPub = null;
                    } else {
                        $scope.startPub = null;
                    }
                } else if ($scope.endPub.lat == value.lat && $scope.endPub.lng == value.lng) {
                    if ($scope.wayPoints.length != 0) {
                        $scope.endPub = {
                            lat: $scope.wayPoints[$scope.wayPoints.length - 1].location.lat,
                            lng: $scope.wayPoints[$scope.wayPoints.length - 1].location.lng
                        };
                        $scope.wayPoints.splice($scope.wayPoints.length - 1, 1);
                    } else {
                        $scope.endPub = null;
                    }
                }
                $scope.wayPoints.forEach(function (element) {
                    if (element.location.lat == value.lat && element.location.lng == value.lng) {
                        var index = $scope.wayPoints.indexOf(element);
                        $scope.wayPoints.splice(index, 1);
                    }
                });
            };
        }
        ])
})();


