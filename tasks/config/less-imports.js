module.exports = function(grunt) {

  grunt.config.set("less_imports", {
    dev: {
      src: require("../pipeline").lessFilesToAssemble,
      dest: ".tmp/public/index.less"
    }
  });

  grunt.loadNpmTasks("grunt-less-imports");
};
