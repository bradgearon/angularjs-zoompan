// Generated on 2014-02-07 using generator-angular-component 0.2.3
'use strict';

module.exports = function (grunt) {

    // Configurable paths
    var yoConfig = {
        livereload: 35729,
        src: 'src',
        less: 'less',
        dist: 'dist'
    };

    // Livereload setup
    var lrSnippet = require('connect-livereload')({
        port: yoConfig.livereload
    });
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yo: yoConfig,
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %>\n' +
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @link <%= pkg.homepage %>\n' +
                ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' */\n'
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
            '.tmp',
            '<%= yo.dist %>/*',
            '!<%= yo.dist %>/.git*'
          ]
        }]
            },
            server: '.tmp'
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: []
            },
            less: {
                files: ['<%= yo.less %>/{,*/}*.less'],
                tasks: ['less:dist']
            },
            app: {
                files: [
                    '<%= yo.src %>/{,*/}*.html',
                    '{.tmp,<%= yo.src %>}/{,*/}*.css',
                    '{.tmp,<%= yo.src %>}/{,*/}*.js'
        ],
                options: {
                    livereload: yoConfig.livereload
                }
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0' // Change this to '0.0.0.0' to access the server from outside.
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, '.')
                            ];
                    }
                }
            }
        },
        less: {
            options: {
                // dumpLineNumbers: 'all',
                paths: ['<%= yo.less %>']
            },
            dist: {
                expand: true,
                cwd: '<%= yo.less %>',
                src: '**.less',
                dest: 'styles/',
                ext: '.css'
            }
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= yo.src %>/{,*/}*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js']
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            },
            unit: {
                singleRun: true
            },
            server: {
                autoWatch: true
            }
        },
        ngmin: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: [
                    '<%= yo.src %>/r.config.js',
                    '<%= yo.src %>/app.js',
                    '<%= yo.src %>/app.config.js',
                    '<%= yo.src %>/services/{*,/}*.js',
                    '<%= yo.src %>/directives/{*,/}*.js',
                    '<%= yo.src %>/controllers/{*,/}*.js'
                ],
                dest: '<%= yo.dist %>/app.js'
            }
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>',
                stripBanners: true
            },
            dist: {
                src: ['<%= yo.src %>/**.js'],
                dest: '<%= yo.dist %>/app.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= yo.dist %>/app.min.js'
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'less:dist',
        'ngmin:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('release', [
        'test',
        'bump-only',
        'dist',
        'bump-commit'
    ]);

    grunt.registerTask('server', [
        'less:dist', 
        'connect', 
        'watch'
    ]);
    
    grunt.registerTask('default', ['build']);

};