'use strict';
define([
    'app',
    'angular',
    'controllers/creeper',
    'directives/zoom'
],
    function (app, angular) {
        app.config([
            '$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
                $routeProvider.when('/', {
                  controller:'CreeperCtrl',
                  templateUrl:'views/creeper.html'
                });
             }
        ]);

        angular.bootstrap(document, ['parfocal']);
    }
);