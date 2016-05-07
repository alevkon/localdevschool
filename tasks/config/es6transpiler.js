/**
 * Clientify – remove require and module.exports
 */
module.exports = function(grunt) {
  grunt.config.set("es6transpiler", {
    dev: {
      options: {
        disallowUnknownReferences: false
      },
      files: [{
        expand: true,
        cwd: "./.tmp/public",
        src: ["**/*.es6"],
        dest: '.tmp/public/',
        ext: ".js"
      }]
    }
  });
  grunt.loadNpmTasks("grunt-es6-transpiler");
};
