var React = require("react");
var Registry = require("../../stores/registry");

module.exports = Registry.registerPage(React.createClass({
  displayName: "editor",

  getInitialState: function() {
    var defValues = {};
    _.forOwn(this.props.dataToEdit, function(value, key) {
      //clumsy, but ok for now
      if (key != 'id' && key != 'course' && key != 'createdAt' && key != 'updatedAt') {
        defValues[key] = value;
      }
    });
    return {defValues: defValues};
  },
  componentWillMount: function() {
    var originalValues = _.cloneDeep(this.state.defValues);
    this.setState({originalValues: originalValues, expand: false})
  },

  saveOnChange: function(evt) {
    var name = evt.target.name;
    var newText = evt.target.value;
    this.setState(function(previousState) {
      previousState.defValues[name] = newText;
      return { defValues: previousState.defValues }

    });
  },

  editEntry: function() {
    this.setState({expand: !this.state.expand});
  },

  render() {
    var self = this;
    if (self.state.expand) {
      return <div className="page page_has_toolbar">
        <a href="javascript: void(0)" onClick={self.editEntry}>Hide</a>
        <form action="/test" method="PUT">
          {_.keys(self.state.defValues).map(function(key) {
            return <div><h3>{key}</h3>
            <textarea
              name={key}
              rows="2"
              cols="30"
              onChange={self.saveOnChange}
              maxLength="300"
              value={self.state.defValues[key]} />
            </div>
          })}
        </form>
        <Registry.controls.saver
          versions={
            {
              original: self.state.originalValues,
              current: self.state.defValues
            }
          }
          identity={self.props.identity}
          upd={self.props.upd}
          id={self.props.dataToEdit.id}>Save unit</Registry.controls.saver>
      </div>
    } else {
      return <a href="javascript: void(0)" onClick={self.editEntry}>{self.props.children}</a>
    }




  }
}));
