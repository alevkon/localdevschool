var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");
var Context = require("../../stores/context");

module.exports = Registry.registerPage(React.createClass({
  displayName: "authorIndex",

  mixins: [
    Reflux.listenTo(Context, "onContextEvent")
  ],

  statics: {
    getTitle(data) {
      return data.author.name + ' dashboard';
    }
  },

  onContextEvent(event) {
    switch(event) {
      case "refresh":
        this.forceUpdate();
        break;
    }
  },

  getInitialState: function() {
    return this.props.params.data;

  },
  updateComponent(current) {
    this.setState(current);
  },

  render() {
    var self = this;
    var author = this.props.params.data.author;
    return <div className="author">
      <h1>{author.name}</h1>
      <p>Author page description</p>
      <h2>Your courses</h2>
      <ul>
        {this.state.courses.map(function(course) {
          return <li key={course.id} id={course.id}>
              <a href={'/author/' + author.slug + '/course/' + course.slug}> {course.title} </a>
          </li>
        })
        }
      </ul>
      <Registry.pages.editor
        create={true}
        data={this.state.courses[0]}
        author={this.state.author}
        identity="course"
        upd={this.updateComponent.bind(this)}>
        Create new course
      </Registry.pages.editor>
      {/*
      <h2>Course navigator</h2>
      <ul>
        <li><a href="/author/course/1">Course 1</a></li>
        <li><a href="/author/course/2">Course 2</a></li>
        <li><a href="/author/course/3">Course 3</a></li>
      </ul>
      */}

    </div>
  }
}));
