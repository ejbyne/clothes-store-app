module.exports = function(grunt){

  grunt.initConfig({

    jasmine_node: {
      options: {
        forceExit: true,
      },
      all: ['spec/server']
    },

    jshint: {
        src: ['server.js', 'app/models/*.js', 'spec/**/*.js', 'test/**/*.js']
    },

    mocha_casperjs: {
      options: {
      },
      files: {
        src: ['test/api/*.js']
      }
    },
    
    watch: {
      scripts: {
        files: ['spec/**/*', 'test/**/*', 'app/**/*'],
        tasks: ['express:test', 'jasmine_node', 'mocha_casperjs', 'jshint', 'protractor']
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
        browsers: ['PhantomJS']
      }
    },

    protractor: {
      options: {
        configFile: "protractor.conf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          configFile: "protractor.conf.js", // Target-specific config file
          args: {} // Target-specific arguments
        }
      },
    }

  });

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-casperjs');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('default', ['express:test', 'jasmine_node', 'mocha_casperjs', 'jshint', 'protractor']);

};
