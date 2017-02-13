/**
 * Created by Leo on 14.12.2016.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('registerController', ['$timeout','$scope', '$http', 'CrawlerFac', 'EventFac', 'PubFac', '$q', function ($timeout,$scope, $http, CrawlerFac, EventFac, PubFac, $q) {
            $scope.currentNavItem = 'page3';

            if(CrawlerFac.getAuthenticated()==false){
                $location.path("/");
            }
            /*Diverse Helpers to get things going*/

            $scope.$on('mapInitialized', function (event, map) {
                $scope.objMapa = map;
            });

            $scope.init = function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {

                        $scope.pub.lat = position.coords.latitude;
                        $scope.pub.lng = position.coords.longitude;

                    }, function () {
                        ///handleLocationError(true, infoWindow, map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
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
                pubOwner: null
            };

            $scope.timer = {openingTime: null, closingTime: null};


            $timeout(function() {
                $scope.marker = new google.maps.Marker({
                    position: {lat: $scope.pub.lat, lng: $scope.pub.lng}
                });
            }, 500)


            $scope.getCoords = function (event) {
                $scope.pub.lat = event.latLng.lat();
                $scope.pub.lng = event.latLng.lng();
            };


            /*Persist our items*/

            $scope.saveEvent = function () {
                $scope.pub.openingTime = timeNow($scope.timer.openingTime);
                $scope.pub.closingTime = timeNow($scope.timer.closingTime);
                geocodeLatLng();
                Materialize.toast('Pub registered', 1000);
                console.log($scope.pub);
                PubFac.allPubs.save($scope.pub).$promise.then(function (data) {
                    console.log(data);
                });
            };


            /*Helper Methods*/

            function timeNow(i) {
                if (i == null) {
                    return "00:00:00"
                }
                var h = (i.getHours() < 10 ? '0' : '') + i.getHours()
                var m = (i.getMinutes() < 10 ? '0' : '') + i.getMinutes();
                return h + ':' + m + ':00';
            }


            var geocodeLatLng = function () {
                var geocoder = new google.maps.Geocoder;
                var latlng = {lat: $scope.pub.lat, lng: $scope.pub.lng};
                geocoder.geocode({'location': latlng}, function (results, status) {
                    if (status === 'OK') {
                        if (results[1]) {
                            /*                            console.log(results[1].formatted_address);*/
                            $scope.pub.adress = results[1].formatted_address;
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


