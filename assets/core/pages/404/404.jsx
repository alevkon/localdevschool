var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");

module.exports = Registry.registerPage(React.createClass({
  displayName: "404",

  render() {
    return <div className="articleEdit">
      <h1>PAGE NOT FOUND</h1>
    </div>
  }
}));
