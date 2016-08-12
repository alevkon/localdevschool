var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");
var Context = require("../../stores/context");

module.exports = Registry.registerPage(React.createClass({
  displayName: "index",

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
    var data = this.props.params.data;

    return <div className="p-index row">
      <div className="col-md-8 col-md-offset-2">
        <h1>Local development school</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>
          <a className="btn btn-primary" href="/author" role="button">Start as author</a>&nbsp;
          <a className="btn btn-success" href="/student" role="button">Start as student</a>&nbsp;
          <a className="btn btn-danger" href="/mentor" role="button">Start as mentor</a>
        </p>
      </div>
    </div>
  }
}));
