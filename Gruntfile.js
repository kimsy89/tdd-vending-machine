module.exports = function(grunt) {
  'use strict';

  var config = {
    app: 'app',
    dist: 'dist'
  };

  require('jit-grunt') (grunt);

  grunt.initConfig({
    sass: {
      dev : {
        options: {
          style: 'compressed',
          sourcemap : true
        },

        files: {
          'dist/css/app.min.css': 'src/scss/app.scss'
        }
      }
    },

    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/scripts',
          src: '{,*/}*.js',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.js',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

    uglify : {
      dev : {
        options : {
          compress : true,
          mangle : true,
          preserveComments : false
        },

        files: {
          'dist/js/app.min.js' : ['src/js/libs/atomic.js', 'src/js/app/app.js']
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js'
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp'
          ]
        }]
      },
      server: '.tmp'
    },

    connect: {
      server: {
        options: {
          open: true,
          keepalive: true,
          port: 7000,
          base: ['app', '.tmp']
        }
      }
    },

    browserSync: {
      options: {
        notify: false,
        background: true,
        watchOptions: {
          ignored: ''
        }
      },
      livereload: {
        options: {
          files: [
            'app/{,*/}*.html',
            // 'app/styles/{,*/}*.css',
            // 'app/images/{,*/}*',
            'app/scripts/{,*/}*.js'
          ],
          port: 9001,
          server: {
            baseDir: ['app', config.app, '.tmp'],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      test: {
        options: {
          port: 9001,
          open: false,
          logLevel: 'silent',
          host: 'localhost',
          server: {
            baseDir: ['.tmp', './test', config.app],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      dist: {
        options: {
          background: false,
          server: 'dist'
        }
      }
    },

    watch: {
      // options: {
      //   livereload: true
      // },
      // js: {
      //   files: ['app/scripts/**/*.js'],
      //   tasks: ['jshint']
      // },
      // gruntfile: {
      //   files: ['Gruntfile.js']
      // },
      // livereload: {
      //   options: {
      //     livereload: true
      //   },
      //   files: [
      //     'app/**/*.html',
      //     'app/scripts/test.js'
      //   ]
      // }
    }
  });

  grunt.registerTask('serve', [
    'clean:server',
    'babel:dist',
    'browserSync:livereload', 
    'watch'
  ]);
};