require.config({
    baseUrl: 'src',
    paths: {
        'angular': '../bower_components/angular/angular',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'jquery': '../bower_components/jquery/jquery',
        'straps': '../bower_components/straps/straps',
        'paper': '../bower_components/paper/src/core/Base',
        'formatter': '../bower_components/paper/src/util/Formatter',
        'matrix': '../bower_components/paper/src/basic/Matrix',
        'point': '../bower_components/paper/src/basic/Point',
        'rectangle': '../bower_components/paper/src/basic/Rectangle',
        'size': '../bower_components/paper/src/basic/Size',
        'hammer': '../bower_components/hammerjs/hammer'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'jquery': {
            exports: '$'
        },
        'hammer': {
            exports: 'Hammer'
        },        
        'straps': {
            exports: 'Base'
        },
        'paper': {
            deps: ['straps']
        },
        'formatter': {
            exports: 'Formatter',
            deps: ['paper']
        },
        'point': {
            exports: 'Point',
            deps: ['paper', 'formatter']
        },
        'matrix': {
            exports: 'Matrix',
            deps: ['paper', 'formatter']
        },
        'rectangle': {
            exports: 'Rectangle',
            deps: ['paper', 'formatter']
        },
        'size': {
            exports: 'Size',
            deps: ['paper', 'formatter']
        }
    }
});