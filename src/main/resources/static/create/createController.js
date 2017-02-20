/**
 * Created by Leo on 14.11.2016.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('createController', ['$location', '$scope', '$http', 'CrawlerFac', 'EventFac', 'PubFac', '$q', function ($location, $scope, $http, CrawlerFac, EventFac, PubFac, $q) {

            /*If no crawle is authenticated get redirected to home*/
            if (CrawlerFac.getAuthenticated() == false) {
                $location.path("/");
            }

            /*Diverse Helpers to get things going*/

            /*Initialize Datepicker*/
            $(document).ready(function () {
                window.picker = $('.datepicker').pickadate({
                    selectYears: 16,
                    format: 'dd.mm.yyyy'
                });
            });

            /*Initialize Map*/
            $scope.$on('mapInitialized', function (event, map) {
                $scope.objMapa = map;
            });

            /*Basic Variables we will need to get the Data from Forms and Google maps*/

            /*Our Event to create*/
            $scope.event =
            {
                eventName: null,
                date: new Date().getTime(),
                description: null,
                timeslotList: [],
                eventOwner: CrawlerFac.getCurrentUser()._links.crawler.href,
                latmax: 0,
                latmin: 0,
                lngmax: 0,
                lngmin: 0,
            }
            ;

            /*The scope variable to get the base64 image representation*/
            $scope.pictureEve = null;

            /*List of Pubs one we are selected one which arent*/
            $scope.openPubs = [];
            $scope.usedPubs = [];


            /*List of Crawlers to invite and list of all crawlers*/
            $scope.openCrawlers = [];
            $scope.usedCrawlers = [];

            /*Waypoints for our map*/
            $scope.wayPoints = [];

            /*End and start pub needed for the right order of pubs*/
            $scope.startPub = null;
            $scope.endPub = null;

            /*Variables to control the shown template in created.html*/
            $scope.created = false;
            $scope.added = false;


            /*$scope.timer = {
             startingTime: null,
             endingTime: null
             };*/

            /*Using the REST Controller to get Data from DB and save it*/
            /*Get all need things*/

            /*Get all Crawlers*/
            CrawlerFac.allCrawlers.get().$promise.then(function (data) {
                data._embedded.crawlers.forEach(function (crawler) {
                    if (crawler.profileID == CrawlerFac.getCurrentUser().profileID) {
                        $scope.addCrawler(crawler);
                    } else {
                        $scope.openCrawlers.push(crawler)
                    }
                })

            });

            /*Gett all Pubs*/
            PubFac.allPubs.get().$promise.then(function (data) {
                $scope.openPubs = data._embedded.pubs;
            });


            /*Persist our items*/

            /*We upload all Users we invite to the events*/
            $scope.uploadUser = function () {
                $scope.usedCrawlers.reduce(function (p, currentValue) {
                    return p.then(function () {
                        return $http({
                            method: 'PATCH',
                            url: String(currentValue._links.eventsList.href),
                            data: {
                                _links: {
                                    href: $scope.event._links.self.href
                                }
                            }
                        })
                    })
                        .then(function (result) {
                            console.log($scope.event);
                            //console.log(result);
                        });
                }, $q.when());

                $scope.usedCrawlers = [];
                Materialize.toast('Crawlers invited', 1000)

            };

            /*We persist all pubs on our created event*/
            $scope.uploadPub = function () {
                $scope.usedPubs.reduce(function (p, currentValue) {
                    if ( parseFloat(currentValue.pub.lat) >= $scope.event.latmax) {
                        $scope.event.latmax =  parseFloat(currentValue.pub.lat);
                    }
                    if ( parseFloat(currentValue.pub.lat) <= $scope.event.latmin || $scope.event.latmin ==0) {
                        $scope.event.latmin =  parseFloat(currentValue.pub.lat);
                    }
                    if ( parseFloat(currentValue.pub.lng) >= $scope.event.lngmax) {
                        $scope.event.lngmax =  parseFloat(currentValue.pub.lng);
                    }
                    if ( parseFloat(currentValue.pub.lng) <= $scope.event.lngmin || $scope.event.lngmin ==0) {
                        $scope.event.lngmin =  parseFloat(currentValue.pub.lng);
                    }
                    $scope.event.timeslotList.push({
                        startingTime: timeNow(currentValue.startingTime),
                        endingTime: timeNow(currentValue.endingTime),
                        pubId: currentValue.pub._links.self.href.substr(currentValue.pub._links.self.href.lastIndexOf("/") + 1)
                    });
                    return p.then(function () {
                        return $http({
                            method: 'PATCH',
                            url: String($scope.event._links.pubsList.href),
                            data: {
                                _links: {
                                    href: currentValue.pub._links.self.href
                                }
                            }
                        })
                    })
                        .then(function (result) {
                            $scope.added = true;
                        });
                }, $q.when());
                Materialize.toast('Pubs added', 1000);
                $scope.usedPubs = [];
                $http({
                    method: 'PATCH',
                    url: String($scope.event._links.self.href),
                    data: {
                        latmax: $scope.event.latmax
                    }
                }).then(function successCallback(response) {
                    $http({
                        method: 'PATCH',
                        url: String($scope.event._links.self.href),
                        data: {
                            latmin: $scope.event.latmin
                        }
                    }).then(function successCallback(response) {
                        $http({
                            method: 'PATCH',
                            url: String($scope.event._links.self.href),
                            data: {
                                lngmax: $scope.event.lngmax
                            }
                        }).then(function successCallback(response) {
                            $http({
                                method: 'PATCH',
                                url: String($scope.event._links.self.href),
                                data: {
                                    lngmin: $scope.event.lngmin
                                }
                            }).then(function successCallback(response) {
                                $http({
                                    method: 'PATCH',
                                    url: String($scope.event._links.self.href),
                                    data: {
                                        timeslotList: $scope.event.timeslotList
                                    }
                                }).then(function successCallback(response) {
                                }, function errorCallback(response) {
                                    console.log("Problem updating TimeslotList" + response);
                                });
                            }, function errorCallback(response) {
                                console.log("Problem updating LNGMIN" + response);
                            });
                        }, function errorCallback(response) {
                            console.log("Problem updating LNGMAX" + response);
                        });
                    }, function errorCallback(response) {
                        console.log("Problem updating LATMIN" + response);
                    });
                }, function errorCallback(response) {
                    console.log("Problem updating LATMAX" + response);
                });
            };


            /*We generate a new Event with the given data*/
            $scope.saveEvent = function () {
                var dateParts = $('.datepicker').val().split(".");
                $scope.event.date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).getTime();
                if ($scope.event.eventImage != null) {
                    $scope.event.eventImage = $scope.event.eventImage.base64;
                }
                Materialize.toast('Event created', 1000);
                EventFac.allEvents.save($scope.event).$promise.then(function (data) {
                    $scope.event = data;
                    $scope.created = true;
                });
            };


            /*Helper Methods*/

            /*parsing the starting and endingtime of our pubs*/
            function timeNow(i) {
                if (i == null) {
                    return null;
                }
                var h = (i.getHours() < 10 ? '0' : '') + i.getHours();
                var m = (i.getMinutes() < 10 ? '0' : '') + i.getMinutes();
                var all = ((h * 3600000) + (m * 60000));
                if (h <= 12) {
                    return $scope.event.date + all + 86400000;
                } else {
                    return $scope.event.date + all;
                }
            }

            /*Basic geocoding to get address*/
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


            /*The windows in our map openend when clicked on a marker*/
            $scope.showInfoWindow = function (event, mark) {
                var infowindow = new google.maps.InfoWindow();
                var center = new google.maps.LatLng(mark.lat, mark.lng);

                infowindow.setContent(
                    '<table><tbody><tr><td><h6>' + mark.pubName + '</h6></td><td></td></tr><tr><td>Prices: ' + mark.price + "/5" + '</td><td></td></tr><tr><td>Size: ' + mark.size + "/5" + '</td></tr><tr><td>Usually open from: ' + mark.openingTime + " to" + mark.closingTime + '</td></tr></tbody></table>'
                );

                infowindow.setPosition(center);
                infowindow.open($scope.objMapa);
            };


            /*Main Methods*/

            /*We select a crawler into the list of invited crawlers*/
            $scope.addCrawler = function (crawler) {
                var index = $scope.openCrawlers.indexOf(crawler);
                $scope.openCrawlers.splice(index, 1);
                $scope.usedCrawlers.push(crawler);
            };

            /*We delete a crawler from the list of invited crawlers*/
            $scope.delCrawler = function (crawler) {
                var index = $scope.usedCrawlers.indexOf(crawler);
                $scope.usedCrawlers.splice(index, 1);
                $scope.openCrawlers.push(crawler);
            };


            /*we select a pub from openpubs and put it in our list of pubs we like to visit*/
            $scope.deleteFromOpens = function (value) {
                var index = $scope.openPubs.indexOf(value);
                $scope.openPubs.splice(index, 1);
                $scope.usedPubs.push({pub: value, startingTime: null, endingTime: null});
                geocodeLatLng(value);
                if ($scope.startPub == null) {
                    $scope.startPub = {lat: value.lat, lng: value.lng};
                } else {
                    if ($scope.endPub == null) {
                        $scope.endPub = {lat: value.lat, lng: value.lng};
                    } else {
                        $scope.wayPoints.push({
                            location: {lat: $scope.endPub.lat, lng: $scope.endPub.lng},
                            stopover: true
                        });
                        $scope.endPub = {lat: value.lat, lng: value.lng};
                    }
                }
            };

            /*deleting a pub from the list of pubs we like to visit*/
            $scope.deleteFromUsed = function (value) {
                $scope.usedPubs.forEach(function (pubs) {
                    if (pubs.pub._links.self.href == value._links.self.href) {
                        var index = $scope.usedPubs.indexOf(pubs);
                        $scope.usedPubs.splice(index, 1);
                    }
                });
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


