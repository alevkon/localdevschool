var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../../stores/registry");
var Context = require("../../../stores/context");

module.exports = Registry.registerPage(React.createClass({
  displayName: "authorCourse",

  mixins: [
    Reflux.listenTo(Context, "onContextEvent")
  ],
  getInitialState: function() {
    return this.props.params.data.units[0].course;

  },
  statics: {
    getTitle(data) {
      return data.units[0].course.title;
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

    return <div className="p-authorCourse page page_has_toolbar">
      <h1>{this.state.title}</h1>

      <p>{this.state.description}</p>

      <Registry.pages.editor
        dataToEdit={this.state}
        upd={this.updateComponent.bind(this)}
        identity="course">Edit course</Registry.pages.editor>

      <h2>Course units</h2>
      <ul>
        {this.props.params.data.units.map(function(unit) {
          return <li key={unit.id} id={unit.id}>
              <a href={'/author/course/' + unit.course.id + '/unit/' + unit.id}>{unit.title}</a>
            </li>
        })}
      </ul>

    </div>
  }
}));


