var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");
var Context = require("../../stores/context");

module.exports = Registry.registerPage(React.createClass({
  displayName: "authorIndex",

  mixins: [
    Reflux.listenTo(Context, "onContextEvent"),
  ],

  statics: {
    getTitle(data) {
      return "Author dashboard";
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

    return <div className="author">
      <h1>Author</h1>
      <p>Author page description</p>
      <h2>Your courses</h2>
      <ul>
        <li><a href="/author/course/1">Course 1</a></li>
        <li><a href="/author/course/2">Course 2</a></li>
        <li><a href="/author/course/3">Course 3</a></li>
      </ul>
      <h2>Course navigator</h2>
      <ul>
        <li><a href="/author/course/1">Course 1</a></li>
        <li><a href="/author/course/2">Course 2</a></li>
        <li><a href="/author/course/3">Course 3</a></li>
      </ul>

    </div>
  }
}));
