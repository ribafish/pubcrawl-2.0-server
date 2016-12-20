/**
 * Created by Leo on 14.12.2016.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('registerController', ['$scope', '$http', 'CrawlerFac', 'EventFac', 'PubFac', '$q', function ($scope, $http, CrawlerFac, EventFac, PubFac, $q) {
            $scope.currentNavItem = 'page3';

            /*Diverse Helpers to get things going*/

            $scope.$on('mapInitialized', function (event, map) {
                $scope.objMapa = map;
            });

            /*Basic Variables we will need to get the Data from Forms and Google maps*/

            $scope.pub =
            {
                pubName: null,
                price: 0,
                rating: 0,
                size: 0,
                description: null,
                lat: null,
                lng: null,
                adress: null,
                openingTime: null,
                closingTime: null,
                topsList: [],
                eventsList: [],
                pubOwner: null
            };

            $scope.timer = {openingTime:null,closingTime:null};

            var init = function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {


                        $scope.pub.lat = position.coords.latitude;
                        $scope.pub.lng = position.coords.longitude;
                        console.log(position);

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
            init();

            $scope.marker = new google.maps.Marker({
                position: {lat: $scope.pub.lat, lng: $scope.pub.lng}
            });

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
                    //console.log($scope.event._links.self.href);
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
                var latlng = {lat:$scope.pub.lat, lng:$scope.pub.lng};
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

            $scope.showInfoWindow = function (event, mark) {
                var infowindow = new google.maps.InfoWindow();
                var center = new google.maps.LatLng(mark.lat, mark.lng);

                infowindow.setContent(
                    '<table><tbody><tr><td><h6>' + mark.pubName + '</h6></td><td></td></tr><tr><td>Prices: ' + mark.prices + '</td><td></td></tr><tr><td>Rating: ' + mark.rating + '</td><td><a class="waves-effect waves-light btn" ng-click="deleteFromOpens(' + mark + ')">add</a></td></tr></tbody></table>'
                );

                infowindow.setPosition(center);
                infowindow.open($scope.objMapa);
            };
        }
        ])
})();


