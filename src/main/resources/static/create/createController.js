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
            $scope.wayPoints = [];

            $scope.startPub = null;
            $scope.endPub = null;

            $scope.timer = {
                startingTime: new Date(0, 0, 0, 0, 0, 0),
                endingTime: new Date(0, 0, 0, 0, 0, 0)
            };


            /*Using the REST Controller to get Data from DB and save it*/


            $scope.openCrawlers = CrawlerFac.get();

            PubFac.allPubs.get().$promise.then(function (data) {
                $scope.openPubs = data._embedded.pubs;
            });


            $scope.saveTime = function () {
                console.log($scope.event);
                $scope.event.timeslotList.push({startingTime: "09:51:52", endingTime: "19:51:52", pubId: 0});
            };

            $scope.saveEvent = function () {
                //console.log($scope.event);
                EventFac.allEvents.save($scope.event).$promise.then(function (data) {
                    //console.log(data);
                });
            };


            /*Diverse Helpers to get things going*/

            window.picker = $('.datepicker').pickadate({
                selectYears: 16,
                format: 'yyyy-mm-dd'
            });

            $scope.$on('mapInitialized', function (event, map) {
                $scope.objMapa = map;
            });


            /*Main Methods*/


            $scope.geocodeLatLng = function (value) {
                var geocoder = new google.maps.Geocoder;
                var latlng = {lat: value.lat, lng: value.lng};
                geocoder.geocode({'location': latlng}, function (results, status) {
                    if (status === 'OK') {
                        if (results[1]) {
                            $scope.startPub = results[1].formatted_address
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


            $scope.deleteFromOpens = function (value) {
                var index = $scope.openPubs.indexOf(value);
                $scope.openPubs.splice(index, 1);
                $scope.usedPubs.push(value);
                if ($scope.startPub == null) {
                    $scope.startPub = $scope.geocodeLatLng(value);
                } else {
                    if ($scope.endPub == null) {
                        $scope.endPub = $scope.geocodeLatLng(value);
                    } else {
                        console.log($scope.wayPoints)
                        $scope.wayPoints.push({
                            location: {lat: $scope.endPub.lat, lng: $scope.endPub.lng},
                            stopover: true
                        });
                        $scope.endPub = geocodeLatLng(value);
                    }
                    google.maps.event.trigger(document.getElementById('map'), 'resize');
                }
            };

            $scope.deleteFromUsed = function (value) {
                var index = $scope.usedPubs.indexOf(value);
                $scope.usedPubs.splice(index, 1);
                $scope.openPubs.push(value);
            };
        }
        ])
})();


