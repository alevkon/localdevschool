var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");
var Markdown = require( "markdown" );
module.exports = Registry.registerControl(React.createClass({
  displayName: "markdown",
  render(){
      var markdownContent = this.props.source;
      var htmlContent = Markdown.markdown.toHTML(markdownContent);
      return <div dangerouslySetInnerHTML={{__html: htmlContent}} />;
  }
}));
