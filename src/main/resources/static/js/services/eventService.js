/**
 * Created by Leo on 07.12.2016.
 */
(function(angular) {
    var eventFactory = function($resource) {
        return{
        allEvents : $resource('/events/', {

        }, {
            update: {
                method: "PUT"
            },
            remove: {
                method: "DELETE"
            },
            get : {
                method: "GET"
            }
            ,
            save : {
                method: "POST"
            }
        })}
    };

    eventFactory.$inject = ['$resource'];
    angular.module("pubApp").factory("EventFac", eventFactory);
}(angular));