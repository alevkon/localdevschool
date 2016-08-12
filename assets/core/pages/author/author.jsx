var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");
var Context = require("../../stores/context");

module.exports = Registry.registerPage(React.createClass({
  displayName: "author",

  mixins: [
    Reflux.listenTo(Context, "onContextEvent")
  ],

  onContextEvent(event) {
    switch(event) {
      case "refresh":
        this.forceUpdate();
        break;
    }
  },

  render() {
    console.log(this.props);
    return <div className="p-author page page_has-toolbar">
      <Registry.controls.toolbar routes={ this.props.routes} params={ this.props.params } />
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          { this.props.page }
        </div>
      </div>
    </div>
  }
}));
