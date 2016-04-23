var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../../stores/registry");
var Context = require("../../../stores/context");

module.exports = Registry.registerPage(React.createClass({
  displayName: "authorUnit",

  mixins: [
    Reflux.listenTo(Context, "onContextEvent")
  ],

  statics: {
    getTitle(data) {
      return "Unit #" + data.unit.id;
    }
  },

  onContextEvent(event) {
    switch(event) {
      case "refresh":
        this.forceUpdate();
        break;
    }
  },

  render() {
    var self = this;
    var data = this.props.params.data;

    return <div className="p-authorUnit page page_has_toolbar">
      <h1>Author unit #{ data.unit.id }</h1>
    </div>
  }
}));
