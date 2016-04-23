/**
 * Clientify – remove require and module.exports
 */
module.exports = function(grunt) {
  grunt.config.set("clientify", {
    dev: {
      dest: require("../pipeline").filesToClientify
    }
  });
};
