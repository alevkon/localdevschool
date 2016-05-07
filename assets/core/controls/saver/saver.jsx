var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");
module.exports = Registry.registerControl(React.createClass({
    displayName: "saver",
    /*getInitialState(){
        return {condition:false}
    },*/
    render(){
        return <div>{this.renderContol()}</div>
    },
    renderContol(){
        console.log(this.state.condition);
        return <div>
                <button type="button" /*or?*/ /*role="button"*/ className="btn btn-success" disabled={this.state.condition === true ? "disabled" : ""} onClick={this.onButtuonClick()}>Save</button>
            </div>
        onButtuonClick: function(){
        console.log("111")
        //var promise = fetch("this.props.id"+"this.props.identity")
            //promise.then(function(response) { }.bind(this));
        //if (this.state.condition === false){
           // alert("done") 
        //} else {alert("error")}
    }, 
    },
    onButtuonClick: function(){
        console.log("111")
        //var promise = fetch("this.props.id"+"this.props.identity")
            //promise.then(function(response) { }.bind(this));
        //if (this.state.condition === false){
           // alert("done") 
        //} else {alert("error")}
    },
    getInitialState(){
        console.log(this.props);
        var original =this.props.ver.orig; 
        var current = this.props.ver.curr; 
        var check = _.isEqual(original,current)
        if (check === true) {
            return {condition:true}
        } else {return {condition:false}}
    },
    


}));