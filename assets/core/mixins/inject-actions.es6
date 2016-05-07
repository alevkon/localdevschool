var Reflux = require("reflux");

var InjectActions = module.exports = function(actions) {
  return {
    Actions: Reflux.createActions(actions),
    init: function() {
      this.listenToMany(this.Actions);
    }
  }
};