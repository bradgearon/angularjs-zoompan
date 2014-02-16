define('app', [
    'angular',
    'angular-resource',
    'angular-route'
],
function (angular, resource, route) {
    // define the module (app)
    var app = angular.module('app-example', [
        // module dependencies
        'ngResource', 
        'ngRoute'
    ]);
    return app;
    
});