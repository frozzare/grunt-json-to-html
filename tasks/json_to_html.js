/*
 * grunt-json-to-html
 * https://github.com/frozzare/grunt-json-to-html
 *
 * Copyright (c) 2013 Fredrik Forsmo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var json_to_html = require('json-to-html');

  grunt.registerMultiTask('json_to_html', 'Grunt plugin for json-to-html', function() {

    // Default options.
    var options = this.options({
      pre: true
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).

        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.readJSON(filepath);
      }).map(function (data) {
        return json_to_html(data);
      });

      // Apply pre tag.
      if (options.pre) {
        src = '<pre>' + src.join('\n') + '</pre>';
      } else {
        src = src.join('\n');
      }

      if (typeof options.output === 'function') {
        // Call custom output function with the src.
        options.output.call(grunt, src);
      } else {
        // Write the destination file.
        grunt.log.writeln(src);

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" created.');
      }
    });
  });

};
