define([
    'angular',
    'angular-resource',
    'angular-route',
    'paper'
],
function (angular, resource, route, paper) {
    
    var app = angular.module('parfocal', [
        'ngResource', 'ngRoute'
    ]);
    return app;
    
});