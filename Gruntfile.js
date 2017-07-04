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

    wiredep: {
      task: {
        src: ['app/index.html']
      }
      // app: {
      //   src: ['app/index.html'],
      //   ignorePath: /\.\.\//
      // },
      // test: {
      //   devDependencies: true,
      //   src: '<%= karma.unit.configFile %>',
      //   ignorePath:  /\.\.\//,
      //   fileTypes:{
      //     coffee: {
      //       block: /(([\s\t]*)#\s*?bower:\s*?(\S*))(\n|\r|.)*?(#\s*endbower)/gi,
      //         detect: {
      //           js: /'(.*\.js)'/gi,
      //           coffee: /'(.*\.coffee)'/gi
      //         },
      //       replace: {
      //         js: '\'{{filePath}}\'',
      //         coffee: '\'{{filePath}}\''
      //       }
      //     }
      //     }
      // },
      // sass: {
      //   src: ['app/styles/{,*/}*.{scss,sass}'],
      //   ignorePath: /(\.\.\/){1,2}bower_components\//
      // }
    }, 

    babel: {
      options: {
        sourceMap: false,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/scripts',
          src: '{,*/}*.js',
          dest: '.tmp/scripts',
          ext: '.js',
          extDot: 'last'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.js',
          dest: '.tmp/spec',
          ext: '.js',
          extDot: 'last'
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

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: 'app/images',
        javascriptsDir: 'app/scripts',
        fontsDir: 'app/styles/fonts',
        //importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: 'dist/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
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

    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              //loose: 'all'
            }]
          ]
        },
        files: {
          '.tmp/scripts/compiled.js': ['app/scripts/**/*.js']
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
            'app/styles/{,*/}*.scss',
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
      scripts: {
        files: 'app/scripts/**/*.js',
        tasks: ['browserify']
      },
      compass: {
        files: 'app/styles/**/*.scss',
        tasks: ['compass:server']
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:server',
    'wiredep',
    'compass:server',
    'browserSync:livereload', 
    'watch'
  ]);
};