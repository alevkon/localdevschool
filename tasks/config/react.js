/**
 * Browserify
 */
module.exports = function(grunt) {
  grunt.config.set("react", {
    dev: {
      files: [{
        expand: true,
        cwd: "./.tmp/public",
        src: ["**/*.jsx"],
        dest: '.tmp/public/',
        ext: ".es6"
      }]
    }
  });
  grunt.loadNpmTasks("grunt-react");
};
