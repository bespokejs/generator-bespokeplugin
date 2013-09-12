// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> v<%= pkg.version %>

module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      src: [
        'bower_components/bespoke.js/dist/bespoke.js',
        'src/**/*.js'
      ],
      options: {
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helper.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jasmine']);

};
