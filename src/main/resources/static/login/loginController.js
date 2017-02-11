/**
 * Created by Leo on 11.01.2017.
 */
(function () {
    'use strict';

    angular.module('pubApp')
        .controller('loginController', ['CrawlerFac','localStorageService', function (CrawlerFac,localStorageService) {
            localStorageService.set("authenticated", true);
            CrawlerFac.setUser();
        }])
})();


