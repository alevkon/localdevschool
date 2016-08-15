var React = require("react");
var Reflux = require("reflux");
var Registry = require("./registry");

var Router = module.exports = Reflux.createStore({
  sourceRoutes: {
    "/": {
      page: "index",
      single: true
    },
    "/author/:author_slug": {
      page: "author",
      indexRoute: "authorIndex",
      childRoutes: {
        "course/:course_slug": {
          indexRoute: "authorCourse",
          childRoutes: {
            "unit/:unit_slug": "authorUnit"
          }
        }
      }
    },
    "/authorSignIn": {
      page: "authorSignIn",
      single: true
    },

    "/authorRegistration": {
      page: "authorRegistration",
      single: true
    },


    //this should be last line, todo: replace with 404 page
    "/*": "404"
  },

  compileRoute(routeSrc, key) {
    //var route = self.sourceRoutes[key];
    var route = _.cloneDeep(routeSrc);

    if ("string" === typeof route) {
      route = {
        path: key,
        page: route
      };
    } else {
      if (!route.path) {
        route.path = key;
      }
    }

    //if ("string" === typeof route.components) {
    //  route.components = Registry.pages[route.components];
    //}
    if (!route.page && route.childRoutes && route.indexRoute) {
      route.components = {
        page: React.createClass({
          displayName: "fake",
          statics: {
            loaderKey: route.loaderKey || route.indexRoute
          },
          render() {
            return this.props.page;
          }
        })
      }
    } else if ("string" === typeof route.page) {
      route.components = route.childRoutes || route.single
        ? Registry.pages[route.page]
        : { page: Registry.pages[route.page] }
    }
    delete route.page;

    if (route.indexRoute) {
      route.indexRoute = Router.compileRoute(route.indexRoute);
    }
    if (route.childRoutes) {
      route.childRoutes = _.map(route.childRoutes, (route, key) => Router.compileRoute(route, key));
    }

    return route;
  },

  getCompiledRoutes() {
    var self = this;
    return _.map(_.keys(this.sourceRoutes), key => {
      return Router.compileRoute(self.sourceRoutes[key], key);
    });
  }
});
