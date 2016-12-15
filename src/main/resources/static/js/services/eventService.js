/**
 * Created by Leo on 07.12.2016.
 */
(function (angular) {
    var eventFactory = function ($resource, $http) {

        var currentEvent = null;

        var getCurrentEvent = function () {
            return currentEvent;
        };

        var setCurrentEvent = function (value) {
            currentEvent = value;
        };

        var getter = function (value) {
            var promise = $http({
                method: 'GET',
                url: String(value)
            }).then(function successCallback(response) {
                return response.data
            }, function errorCallback(response) {
                console.log("EventService Problem " + response);
            });
            return promise;
        };

        return {
            getter : getter,
            getCurrentEvent: getCurrentEvent,
            setCurrentEvent: setCurrentEvent,
            allEvents: $resource('/events/', {}),
            getPubsList : $resource('/events/:eventId/pubsList',
                {},
                { get: { method: 'GET', params: {eventId: '@eventId'}}}),
            getParticipantsList : $resource('/events/:eventId/participantsList',
                {},
                { get: { method: 'GET', params: {eventId: '@eventId'}}})
        }
    };

    eventFactory.$inject = ['$resource', '$http'];
    angular.module("pubApp").factory("EventFac", eventFactory);
}(angular));