/*
 * grunt-json-to-html
 * https://github.com/frozzare/grunt-json-to-html
 *
 * Copyright (c) 2013 Fredrik Forsmo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    json_to_html: {
      default_options: {
        options: {
          output: function (html) {
            // Simple test to control the output.
            var expected = grunt.file.read('test/data.html');
            console.log('json-to-html: ' + (expected === html ? 'Expected match output html' : 'Expected don\'t match output html'));
          }
        },
        files: {
          'test/data.html': 'test/data.json'
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'json_to_html']);

};
