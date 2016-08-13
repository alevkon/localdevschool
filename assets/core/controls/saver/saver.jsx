var React = require("react");
var Registry = require("../../stores/registry");

module.exports = Registry.registerControl(React.createClass({
  displayName: "saver",

  onClickHandler: function() {
    var self = this, json;


    if (this.props.create) {
      if (!this.props.versions.current.title || !this.props.versions.current.description) {
        alert('Please, enter Title and Description');

      } else {
        switch(this.props.identity) {
          case 'unit':
            this.props.versions.current['course'] = this.props.data.course.id;
            break;
          default:
            break;
        }
        json = JSON.stringify(this.props.versions.current);
        fetch('/api/' + this.props.identity, {method: 'POST', body: json})
          .then(function (response) {
            if (response.ok) {
              
              // window.location = '/author'
            } else {
              alert('Error!')
            }
          });
      }
    } else {
      json = JSON.stringify(this.props.versions.current);
      fetch('/api/' + this.props.identity + '/' + this.props.data.id, {method: 'PUT', body: json})
        .then(function (response) {
          if (response.ok) {
            self.props.upd(self.props.versions.current);
            self.props.versions.original = self.props.versions.current;
            self.forceUpdate();
          } else {
            alert('Error!')
          }
        });
    }
  },

  render() {
    var disabled = '';
    if (_.isEqual(this.props.versions.current, this.props.versions.original)) {
      disabled = ' disabled';
    } else {
      disabled = '';
    }
    return <div>
      <button type="button" onClick={this.onClickHandler} className={'btn btn-primary' + disabled}>{this.props.children}</button>
    </div>
  }
}));
