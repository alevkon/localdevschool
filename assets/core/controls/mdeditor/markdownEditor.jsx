var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");
module.exports = Registry.registerControl(React.createClass({
    displayName: "markdownEditor",
    render(){
        return <div class="row">
            <div className="col-md-6">{this.props.value}</div>
            <div className="col-md-6" ><Registry.controls.markdown source={this.props.value}/></div>
        </div>;
    },
}));