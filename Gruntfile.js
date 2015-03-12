module.exports = function(grunt){

  grunt.initConfig({

    jasmine_node: {
      options: {
        forceExit: true,
      },
      all: ['spec/server']
    },

    jshint: {
        src: ['server.js', 'app/models/*.js', 'spec/**/*.js', 'test/api/*.js']
    },

    mocha_casperjs: {
      options: {
      },
      files: {
        src: ['test/**/*.js']
      }
    },
    
    watch: {
      scripts: {
        files: ['spec/**/*', 'test/**/*', 'app/**/*', 'public/app/**/*'],
        tasks: ['karma', 'express:test', 'jshint', 'jasmine_node', 'mocha_casperjs']
      }
    },

    express: {
      test: {
        options: {
          script: 'server.js',
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true,
        singleRun: false
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['Chrome']
      }
    }

  });

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-casperjs');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['karma', 'express:test', 'jshint', 'jasmine_node', 'mocha_casperjs']);

};
