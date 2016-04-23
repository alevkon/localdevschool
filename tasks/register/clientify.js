module.exports = function(grunt) {

  grunt.registerMultiTask("clientify", "", function() {
    this.files.forEach(function (f) {

      grunt.file.expand({}, f.dest).forEach(function(filename){
        var content = grunt.file.read(filename);

        content = content
          .replace(/module\.exports\s*\=/g, "")
          .replace(/[^\r\n]*require\s*\([^\r\n]*/g, "")
          .replace(/^[^\r\n]*require\s*\([^\r\n]*/g, "");
          //.replace(/(var\s*)?[^\=]*\=\s*require\s*\([^\)]*\)\s*;?/g, "");

        grunt.file.write(filename, content);
      });
    });
  });
};
