module.exports = function(grunt){

  grunt.initConfig({

    jasmine_node: {
      options: {
        forceExit: true,
      },
      all: ['spec/']
    },

    jshint: {
        src: ['server.js', 'app/models/*', 'spec/*']
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
        files: ['spec/*', 'test/**/*'],
        tasks: ['express:test', 'jasmine_node', 'jshint', 'mocha_casperjs']
      }
    },

    express: {
      test: {
        options: {
          script: 'server.js',
        }
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-casperjs');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express:test', 'jasmine_node', 'jshint', 'mocha_casperjs']);

};
