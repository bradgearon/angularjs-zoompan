define([
    'angular',
    'angular-resource',
    'angular-route'
],
function (angular, resource, route) {
    
    var app = angular.module('parfocal', [
        'ngResource', 'ngRoute'
    ]);
    return app;
    
});