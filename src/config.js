'use strict';
define('config', [
    'app',
    'controllers/creeper',
    'directives/zoom'
],
    function (app) {
        // configure the app and dependent services
        app.config([
            '$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
                $routeProvider.otherwise({
                  controller:'CreeperCtrl',
                  templateUrl:'views/creeper.html'
                });
             }
        ]);
        return app;
    }
);