var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");
var markdown = require( "markdown" ).markdown;
module.exports = Registry.registerControl(React.createClass({
  displayName: "markdown",
  render(){
      //console.log(this.props);
      var mark_content = this.props.source;
      //var mark_content = "Hello.\n\n* This is markdown.\n* It is fun\n* Love it or leave it.";
      var html_content = markdown.toHTML(mark_content);
      return <div dangerouslySetInnerHTML={{__html: html_content}} />;
  }
}));
