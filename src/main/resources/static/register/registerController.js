/**
 * Created by Leo on 14.12.2016.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('registerController', ['$location', '$timeout', '$scope', '$http', 'CrawlerFac', 'EventFac', 'PubFac', '$q', function ($location, $timeout, $scope, $http, CrawlerFac, EventFac, PubFac, $q) {


            /*if the user is not authenticated redirect home*/
            if (CrawlerFac.getAuthenticated() == false) {
                $location.path("/");
            }
            /*Diverse Helpers to get things going*/

            /*create a new map scope to use in controller*/
            $scope.$on('mapInitialized', function (event, map) {
                $scope.objMapa = map;
            });


            $scope.init = function () {
                /*get currentlocation for map and set the geocode of pub/marker there*/
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {

                        $scope.pub.lat = position.coords.latitude;
                        $scope.pub.lng = position.coords.longitude;

                    }, function () {
                        ///handleLocationError(true, infoWindow, map.getCenter());
                    });
                } else {
                    //Browser doesn't support Geolocation
                    //handleLocationError(false, infoWindow, map.getCenter());
                }


                function handleLocationError(browserHasGeolocation, infoWindow) {
                    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
                }
            };
            $scope.init();

            /*Basic Variables we will need to get the Data from Forms and Google maps*/

            /*scope which represents the new registered pub*/
            $scope.pub =
            {
                pubName: null,
                price: 0,
                rating: 0,
                size: 0,
                description: null,
                lat: navigator.geolocation.getCurrentPosition(function (position) {
                    return position.coords.latitude;
                }, function () {
                }),
                lng: navigator.geolocation.getCurrentPosition(function (position) {
                    return position.coords.longitude;
                }, function () {
                }),
                adress: null,
                openingTime: null,
                closingTime: null,
                topsList: [],
                eventsList: [],
                pubOwner: CrawlerFac.getCurrentUser()._links.crawler.href
            };

            $scope.timer = {openingTime: null, closingTime: null};

            /*setting the marker with delay to allow google getting the location*/
            $timeout(function () {
                $scope.marker = new google.maps.Marker({
                    position: {lat: $scope.pub.lat, lng: $scope.pub.lng}
                });
            }, 500)

            /*get the lat and lng of the marker*/
            $scope.getCoords = function (event) {
                $scope.pub.lat = event.latLng.lat();
                $scope.pub.lng = event.latLng.lng();
            };


            /*Persist our items*/

            /*save the pub name confusing here soory!*/
            $scope.saveEvent = function () {
                geocodeLatLng();
                $scope.pub.openingTime = timeNow($scope.timer.openingTime);
                $scope.pub.closingTime = timeNow($scope.timer.closingTime);
                if ($scope.pub.pubImage != null) {
                    $scope.pub.pubImage = $scope.pub.pubImage.base64;
                }
                /*need to be later to get an adress from google api*/
                $timeout(function () {
                    PubFac.allPubs.save($scope.pub).$promise.then(function (data) {
                        $location.path("/");
                        Materialize.toast('Pub registered', 1000);
                    }, function errorCallback(response) {
                        Materialize.toast('Error!', 1000);
                    });
                }, 500)

            };


            /*Helper Methods*/

            /*convert times*/
            function timeNow(i) {
                if (i == null) {
                    return "00:00:00"
                }
                var h = (i.getHours() < 10 ? '0' : '') + i.getHours()
                var m = (i.getMinutes() < 10 ? '0' : '') + i.getMinutes();
                return h + ':' + m + ':00';
            }

            /*geocoder to get address*/
            var geocodeLatLng = function () {
                var geocoder = new google.maps.Geocoder;
                var latlng = {lat: $scope.pub.lat, lng: $scope.pub.lng};
                geocoder.geocode({'location': latlng}, function (results, status) {
                    if (status === 'OK') {
                        if (results[1]) {
                            $scope.pub.adress = results[1].formatted_address;
                            /*console.log(results[1].formatted_address);*/
                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            };
        }
        ])
})();


