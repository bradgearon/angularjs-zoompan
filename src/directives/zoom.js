
define('directives/zoom', [
    'app',
    'matrix',
    'rectangle',
    'point',
    'size',
    'hammer',
    'services/events'
],
    function (app, matrix, rectangle, point, size, Hammer) {
        app.directive('pfZoom', ['$log', '$window',
            function (log, window) {
                return function (scope, elem, attrs) {
                    log.info(attrs);                                        
                    var eventPoint, 
                        lastEventPoint, 
                        $window = angular.element(window);
                    
                    var clamp = function (num, min, max) {
                        return Math.min(Math.max(num, min), max);
                    };

                    var clampPoint = function (pt, min, max) {
                        pt.set(clamp(pt.x, min.x, max.x), clamp(pt.y, min.y, max.y));
                        return pt;
                    }

                    var target = elem;
                    var parent = elem.parent();

                    scope.style = {};
                    scope.rect = {};

                    // todo: move this to touchservice
                    var hammer = Hammer(elem[0]);

                    var calculateBounds = function () {
                        scope.bounds = new rectangle(parent[0].offsetLeft, parent[0].offsetTop,
                            parent[0].offsetWidth, parent[0].offsetHeight);

                        scope.rect = new rectangle(0, 0,
                            elem[0].clientWidth, elem[0].clientHeight);

                        var ix = scope.bounds.size.divide(scope.rect.size);
                        var mix = Math.min(ix.width, ix.height);

                        scope.size = new size(elem[0].clientWidth, elem[0].clientHeight);
                        scope.minScale = new size(mix, mix);
                        scope.scale = mix;

                        scope.rect.setCenter(scope.bounds.center);
                        scope.topLeft = scope.rect.topLeft;
                        scope.clamp = scope.rect.topLeft.clone();
                        scope.clampRect = new rectangle(scope.clamp, scope.rect.size);

                        scope.$apply();
                    };
                    
                    elem.on('load', calculateBounds);
                    $window.on('resize', calculateBounds);
                    
                    hammer.on('dragstart', function (event) {
                        event.preventDefault();
                        if (!event.gesture) {
                            return;
                        }

                        scope.$apply(function () {
                            scope.start = new point(scope.topLeft);
                        });
                    });

                    hammer.on('drag', function (event) {
                        event.preventDefault();
                        if (!event.gesture) {
                            return;
                        }

                        scope.$apply(function () {
                            scope.topLeft = scope.start.add(
                                event.gesture.deltaX, event.gesture.deltaY);
                        });

                    });


                    hammer.on('mousewheel', function (event) {
                        event.preventDefault();
                        var wheelDelta = clamp(event.wheelDelta, -1, 1);
                        var scale = clamp((scope.scale || 1) + wheelDelta * .1,
                            Math.min(scope.minScale.height, scope.minScale.width),
                            5);

                        // cursor relative to center of image
                        var zoomPoint = new point(event.clientX, event.clientY)
                            .subtract(scope.bounds.center)
                            .multiply(scale - scope.scale)
                            .multiply(scale);
                        
                        scope.$apply(function () {
                            scope.scale = scale;
                            scope.topLeft =  scope.topLeft.subtract(zoomPoint);
                        });
                    });

                    scope.$watch('topLeft', function (val, valn) {
                        if (val === null || val === valn) {
                            return;
                        }

                        val = clampPoint(
                            val, scope.clampRect.topLeft,
                            scope.clampRect.bottomRight);

                        scope.rect.setTopLeft(val.x, val.y);

                        scope.style.translate =
                            'translate(' + val.x + 'px,' + val.y + 'px)';
                    });

                    scope.$watch('scale', function (val, valn) {
                        if (val == Infinity || valn === val) {
                            return;
                        }

                        log.info('scale', val);
                        scope.rect.size = scope.size.multiply(val);

                        var extra = scope.bounds.size.subtract(scope.rect.size);

                        extra.width = Math.min(extra.width, 0);
                        extra.height = Math.min(extra.height, 0);

                        scope.clampRect.setSize(extra.abs());
                        scope.clampRect.setTopLeft(scope.clamp.x + extra.width / 2,
                            scope.clamp.y + extra.height / 2);

                        scope.style.scale = 'scale(' + val + ')';
                    });

                    scope.$watch('style', function (val, valn) {
                        if (val === null || val === valn) {
                            return;
                        }

                        target[0].style.WebkitTransform = [
                                val.translate, val.scale
                        ].join(' ');

                    }, true);
                };
        }])
    }
);