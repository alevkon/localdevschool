module.exports = function (grunt) {
	grunt.registerTask("compileAssets", [
		"clean:dev",
    "less_imports:dev",
		"less:dev",
		"copy:dev",
    "clientify:dev",
    "react:dev",
    "es6transpiler:dev",
		"clean:sources",
		"coffee:dev"
	]);
};
