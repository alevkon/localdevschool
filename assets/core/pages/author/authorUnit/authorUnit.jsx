var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../../stores/registry");
var Context = require("../../../stores/context");

module.exports = Registry.registerPage(React.createClass({
  displayName: "authorUnit",

  getInitialState: function() {
    return this.props.params.data.unit;

  },
  mixins: [
    Reflux.listenTo(Context, "onContextEvent")
  ],

  statics: {
    getTitle(data) {
      return data.unit.title;
    }
  },

  onContextEvent(event) {
    switch(event) {
      case "refresh":
        this.forceUpdate();
        break;
    }
  },

  updateComponent(current) {
    this.setState(current);
  },

  render() {
    var title = this.state.title;
    var description = this.state.description;

    return <div className="p-authorUnit page page_has_toolbar">
      <h1>{ title }</h1>
      <p>{ description }</p><br/>
      <Registry.pages.editor
        upd={this.updateComponent.bind(this)}
        dataToEdit={this.state}
        identity="unit">Edit unit</Registry.pages.editor>
    </div>
  }
}));
