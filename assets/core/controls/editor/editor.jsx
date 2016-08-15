var React = require("react");
var Registry = require("../../stores/registry");

module.exports = Registry.registerPage(React.createClass({
  displayName: "editor",

  getInitialState: function() {
    //if we create new one
    if (this.props.create) {
      var values = this.getRequiredFields();
      _.mapValues(values, function(value, key, obj) {
        return obj[key] = '';
      });
      return {defValues: values}
    }
    return {defValues: this.getRequiredFields()};
  },

  componentWillMount: function() {
    var originalValues = _.cloneDeep(this.state.defValues);
    this.setState({originalValues: originalValues, expand: false});


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
  getRequiredFields: function() {
    return _.pick(this.props.data, (value, key) => {
      return this.props.data.hasOwnProperty(key) &&
        key !='id' &&
        key != 'createdAt' &&
        key != 'updatedAt' &&
        key != 'course' &&
        key != 'unit' &&
        key != 'empty' &&
        key != 'slug' &&
        key != 'author'
    });
  },

  firstToUpperCase: function(str) {
    return str[0].toUpperCase() + str.slice(1)
  },

  updateComponent(current) {
    this.forceUpdate();
    this.props.upd(current);
  },

  render() {
    var self = this;
    if (this.state.expand) {
      return <div className="page page_has_toolbar">
        <a href="javascript: void(0)" onClick={self.editEntry}>Hide</a>
        <form action="/test" method="PUT">
          {_.map(_.keys(self.state.originalValues), function(key) {
            return <div><h3>{self.firstToUpperCase(key)}</h3>
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
              original: this.state.originalValues,
              current: this.state.defValues
            }
          }
          create={this.props.create}
          author={this.props.author}
          identity={this.props.identity}
          upd={this.updateComponent.bind(this)}
          data={this.props.data}>Save unit</Registry.controls.saver>
      </div>
    } else {
      return <a href="javascript: void(0)" onClick={self.editEntry}>{self.props.children}</a>
    }




  }
}));
