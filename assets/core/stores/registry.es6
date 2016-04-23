var Reflux = require("reflux");

var Registry = module.exports = Reflux.createStore({
  controls: {},
  pages: {},
  sources: {
    controls: {},
    pages: {}
  },
  registerControl(reactClass) {
    return this.controls[reactClass.displayName] = reactClass;
  },
  registerPage(reactClass) {
    return this.pages[reactClass.displayName] = reactClass;
  }
});
