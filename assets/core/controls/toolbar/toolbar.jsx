var React = require("react");
var Reflux = require("reflux");
var Registry = require("../../stores/registry");

module.exports = Registry.registerControl(React.createClass({
  displayName: "toolbar",

  getRouteTitle(route) {
    var components = route.indexRoute
      ? route.indexRoute.components
      : route.components;
    var page = components.page || components;
    if (!page) return false;

    return (page && page.getTitle && page.getTitle(this.props.params.data)) || route.path.split("/").pop();
  },

  processParametrizedURL(url) {
    _.each(this.props.params, (value, key) => {
      if (typeof value !== "string" && typeof value !== "number") return;
      url = url.replace(":" + key, value);
    });
    return url;
  },

  render() {
    var self = this;
    var path = "";
    var routes = _.filter(this.props.routes, route => !!route.path);

    return <div className="toolbar">
      <a href="/" className="toolbar__logo">@LocalDevSchool</a>
      <ol className="breadcrumb">
      {
        _.map(routes, (route, index) =>
            <li className={ index === routes.length - 1 ? "active" : null }>
              {
                index === routes.length - 1
                  ? self.getRouteTitle(route)
                  : <a href={ self.processParametrizedURL(path += "/" + (route.path.replace(/^\//, ""))) }>
                      { self.getRouteTitle(route) }
                    </a>
              }
            </li>
        )
      }
      </ol>
    </div>
  }
}));
