/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */

// CSS files to inject in order
//
// (if you"re using LESS with the built-in default config, you"ll want
//  to change `assets/styles/importer.less` instead.)
//var cssFilesToInject = [
//  "styles/**/*.css"
//];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn"t matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you"ll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  "templates/**/*.html"
];

var jsCore = []
    .concat("core/mixins/**/*.es6")
    .concat("core/stores/**/*.es6")
    .concat("core/components/**/*.js*")
    .concat("core/components/**/*.es6")
    .concat("core/semanticles/**/*.js*")
    .concat("core/semanticles/**/*.es6")
    .concat("core/pages/**/[^_]*.js*")
    .concat("core/pages/**/[^_]*.es6")
    .concat("core/app.jsx")
  ;

// Files to copy to .tmp/public using "copy" task
var jsLibs = [
  "lib/lodash/dist/lodash.js",
  "lib/react/react.js",
  "../node_modules/react-dom/dist/react-dom.js",
<<<<<<< HEAD
  "../node_modules/markdown/bin/md2html.js",
=======
>>>>>>> 57517bb7ebde3458d19a022bc84459c3382ece46
  "../node_modules/history/umd/History.js",
  "../node_modules/react-router/umd/ReactRouter.js",
  //"lib/react-router/ReactRouter.min.js",
  "lib/mobile-detect/mobile-detect.js",
  "lib/reflux/dist/reflux.js",
  "../node_modules/whatwg-fetch/fetch.js",
  "lib/es6-promise/dist/es6-promise.js"
  //"lib/sanitize-html/index.js"
];

module.exports.jsFilesToInject = jsLibs.map(function(path) {
  return "lib/" + path.replace(/^.*\/([^\/]*)$/, "$1");
}).concat([
  "core/mixins/*.js",
  "core/stores/DOM.js",
  "core/stores/editor.js",
  "core/stores/*.js",
  "core/components/**/*.js",
  "core/semanticles/**/*.js",
  "**/*.js"
]).map(function(path) {
  return ".tmp/public/" + path;
});

console.log(module.exports.jsFilesToInject);

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.filesToCopy = jsCore.concat([
    "images/**/*"
]);
module.exports.filesToCopyFlatten = jsLibs.concat([
  "lib/bootstrap/dist/fonts/**/*"
]);
module.exports.filesToClientify = jsCore.map(function(path) {
    return ".tmp/public/" + path;
});
module.exports.lessFilesToAssemble = [
  //"src/directives/plat-base/plat-base.less",
  "assets/core/semanticle.less",
  "assets/core/**/[^_]*.less"
];
module.exports.cssFilesToInject = ".tmp/public/index.less";

module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return "assets/" + path;
});
