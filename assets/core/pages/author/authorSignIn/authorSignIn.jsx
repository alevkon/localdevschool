var React = require("react");
var Registry = require("../../../stores/registry");
var ReactDOM = require("react-dom/server");

Registry.pages["authorSignIn"] = React.createClass({
  displayName: "authorSignIn",

  render: function() {
    return <div>{this.props.params.data.message}<br/>
      <LoginForm params={this.props.params}/>
    </div>
  }
});

var LoginForm = React.createClass({
  render: function() {
    var email = this.props.params.data.email;
    return <div>
      <form action={'/authorSignIn?redirectURL=' + this.props.params.data.redirectURL} method="POST">
        <table>
          <tbody>
          <tr>
            <td>Email:</td>
            <td><input name="email" placeholder="billgates@microsoft.com" defaultValue={email} /></td>
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
      <a href="/authorRegistration">Registration</a>
    </div>
  }
});
