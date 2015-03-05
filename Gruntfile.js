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
        src: ['test/api/*.js']
      }
    },
    
    watch: {
      scripts: {
        files: ['spec/*'],
        tasks: ['jasmine_node', 'jshint', 'mocha_casperjs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-casperjs');

  grunt.registerTask('default', ['jasmine_node', 'jshint', 'mocha_casperjs']);

};
