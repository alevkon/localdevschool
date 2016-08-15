var React = require("react");
var Registry = require("../../../stores/registry");
var ReactDOM = require("react-dom/server");

Registry.pages["authorRegistration"] = React.createClass({
  displayName: "authorRegistration",

  render: function() {
    return <div>{this.props.params.data.message}<br/>
      <RegistrationForm params={this.props.params}/>
    </div>
  }
});

var RegistrationForm = React.createClass({
  render: function() {
    return <div>
      <form action="authorRegistration" method="POST">
        <table>
          <tbody>
          <tr>
            <td>Name:</td>
            <td><input name="name" placeholder="Bill Gates" /></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td><input name="email" placeholder="billgates@microsoft.com" /></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input name="password" /></td>
          </tr>
          <tr>
            <td> </td>
            <td><button style={{float:'right'}} type="submit">Submit</button></td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  }
});
