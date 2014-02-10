'use strict';
define([
    'app',
    'directives/index',
    'controllers/index'
],
    function (app) {
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