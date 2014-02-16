define('directives/zoom', [
    'app',
    'matrix',
    'rectangle',
    'point',
    'size',
    'services/events'
],
    function (app, matrix, rectangle, point, size) {
        app.directive('pfZoom', ['$log', 'events',
            function (log, Events) {
                return function (scope, elem, attrs) {
                    
                    var eventPoint,
                        lastEventPoint,
                        events = new Events(elem),
                        parent = elem.parent();
                    
                    scope.style = {};
                    scope.rect = {};
                    
                    
                    var clamp = function (num, min, max) {
                        return Math.min(Math.max(num, min), max);
                    };

                    var clampPoint = function (pt, min, max) {
                        pt.set(clamp(pt.x, min.x, max.x), clamp(pt.y, min.y, max.y));
                        return pt;
                    }

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

                    events.bindLoad(calculateBounds);
                    events.bindWindowResize(calculateBounds);

                    events.bindDragStart(function (event) {
                        scope.$apply(function () {
                            scope.start = new point(scope.topLeft);
                        });
                    });

                    events.bindDrag(function (event) {
                        scope.$apply(function () {
                            scope.topLeft = scope.start.add(
                                event.gesture.deltaX, event.gesture.deltaY);
                        });
                    });

                    events.bindTransform(function (event) {
                        var scale = clamp((scope.scale || 1) + event.scale * .1,
                            Math.min(scope.minScale.height, scope.minScale.width),
                            5);

                        // cursor relative to center of image
                        var zoomPoint = new point(event.clientX, event.clientY)
                            .subtract(scope.bounds.center)
                            .multiply(scale - scope.scale)
                            .multiply(scale);

                        scope.$apply(function () {
                            scope.scale = scale;
                            scope.topLeft = scope.topLeft.subtract(zoomPoint);
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

                        // todo transform service or something...
                        elem[0].style.WebkitTransform = [
                                val.translate, val.scale
                        ].join(' ');

                    }, true);
                };
        }])
    }
);