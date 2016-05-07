var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../../stores/registry");
var Context = require("../../../stores/context");

module.exports = Registry.registerPage(React.createClass({
  displayName: "authorCourse",

  mixins: [
    Reflux.listenTo(Context, "onContextEvent")
  ],

  statics: {
    getTitle(data) {
      return "Course #" + data.course.id;
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

    return <div className="p-authorCourse page page_has_toolbar">
      <h1>Course #{ data.course.id }</h1>

      <p>Course description</p>
      <h2>Course units</h2>
      <ul>
        <li><a href={ "/author/course/" + data.course.id + "/unit/1" }>Unit 1</a></li>
        <li><a href={ "/author/course/" + data.course.id + "/unit/2" }>Unit 2</a></li>
        <li><a href={ "/author/course/" + data.course.id + "/unit/3" }>Unit 3</a></li>
      </ul>
    </div>
  }
}));
