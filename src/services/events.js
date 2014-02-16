define('services/events', [
    'app',
    'hammer'
],
    function (app, Hammer) {
        app.service('events', ['$log', '$window',
            function (log, window) {
                var Events = function (elem) {
                    return {
                        elem: elem,
                        hammer: Hammer(elem[0]),
                        $window: angular.element(window),
                        normalizeEvent: function (fn) {
                            return function (event) {
                                event.preventDefault();
                                if (!event.gesture) {
                                    return;
                                }
                                fn(event);
                            }
                        },
                        normalizeWheel: function (fn) {
                            return function (event) {
                                event.preventDefault();
                                event.scale = Math.min(Math.max(event.wheelDelta, -1), 1);
                                fn(event);
                            }
                        },
                        bindLoad: function (fn) {
                            this.elem.on('load', fn);
                        },
                        bindWindowResize: function (fn) {
                            this.$window.on('resize', fn);
                        },
                        bindDragStart: function (fn) {
                            this.hammer.on('dragstart', this.normalizeEvent(fn));
                        },
                        bindDrag: function (fn) {
                            this.hammer.on('drag', this.normalizeEvent(fn));
                        },
                        bindTransform: function (fn) {
                            this.hammer.on('mousewheel', this.normalizeWheel(fn));
                        },
                    }
                };
                return Events;
            }
        ]);
    });