'use strict';
define([
    'app',
    'angular',
    'controllers/creeper',
],
    function (app, angular) {
        app.config([
            '$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
                $routeProvider.when('/', {
                  controller:'CreeperCtrl',
                  templateUrl:'views/creeper'
                });
             }
        ]);

        angular.bootstrap(document, ['parfocal']);
    }
);