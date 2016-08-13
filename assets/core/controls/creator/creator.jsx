var React = require("react");
var Registry = require("../../stores/registry");

module.exports = Registry.registerPage(React.createClass({
  displayName: "creator",

  getInitialState: function() {
    return this.props;
  },
  componentWillMount: function() {
    this.setState({expand: false});
    console.log(this.state);
  },

  saveOnChange: function(evt) {

  },

  expandElement: function() {
    this.setState({expand: !this.state.expand});
  },

  render() {
    var self = this;
    if (self.state.expand) {
      return <div className="page page_has_toolbar">
        <a href="javascript: void(0)" onClick={self.expandElement}>Hide</a>
        <form action="/test" method="PUT">
          {this.state.fields.map(function(key) {
            return <div><h3>{key}</h3>
            <textarea
              name={key}
              rows="2"
              cols="30"
              onChange={self.saveOnChange}
              maxLength="300"
            />
            </div>
          })}
        </form>
      </div>
    } else {
      return <a href="javascript: void(0)" onClick={self.expandElement}>{self.props.children}</a>
    }




  }
}));
