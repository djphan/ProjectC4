// Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'public/*.js', 'public/*/*.js']
    },
    mocha: {
      all: {
        src: ['tests/mocha/testrunner.html']
      },
      options: {
        run: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-force-task');

  grunt.registerTask('default', ['force:jshint', 'mocha']);
};
