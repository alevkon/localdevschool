var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");
var markdown = require( "markdown" ).markdown;
module.exports = Registry.registerControl(React.createClass({
    displayName: "markdownEditor",
    getInitialState() {
        return {
            code: this.props.value
        };
    },
    onChange() {
        this.setState({code: this.props.onChange});
    },
    
    render(){
        var html_content = markdown.toHTML(this.state.code)
        //var text = this.props.onchange;
        
        return <div>
            <div className="col-md-6" value={this.state.code} onChange={this.onChange}>{this.state.code}</div>
            <div className="col-md-6" ><div dangerouslySetInnerHTML={{__html: html_content}} /></div>
        </div>
                
            

    },
}));