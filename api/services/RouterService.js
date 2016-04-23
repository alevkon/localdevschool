var React = require("react");
var ReactDOM = require("react-dom/server");
var ReactRouter = require("react-router");
var Registry = require("../../assets/core/stores/registry");
var Router = require("../../assets/core/stores/router");
var Context = require("../../assets/core/stores/context");

var util = require("util");

module.exports = {
  //should be initialized by bootstrap
  routeConfig: null,
  loaders: {},

  init(a) {
    //RouterService.routeConfig = RouterService.pageRoutesToReact(sails.config.platform.pageRoutes);
    RouterService.routeConfig = Router.getCompiledRoutes();
    ReactRouter.createRoutes(RouterService.routeConfig);

    _.extend(sails.config.routes, RouterService.pageRoutesToSails(sails.config.platform.pageRoutes));
  },

  pageRoutesToSails(pageRoutes) {
    return _.mapValues(pageRoutes, (value, key) => "page.serve");
  },

  pageRoutesToReact(pageRoutes) {
    return _.map(_.keys(pageRoutes), key => {
      var route = pageRoutes[key];
      if ("string" === typeof route) {
        route = {
          path: key,
          component: route
        };
      }

      if ("string" === typeof route.component) {
        route.component = Registry.pages[route.component];
      }
      return route;
    });
  },

  serve(req, res) {
//console.log(777);
    ReactRouter.match({
      routes: module.exports.routeConfig,
      location: req.originalUrl
    }, (err, redirectLocation, renderProps) => {
      if (err) return res.serverError(err);

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      }

      if (!renderProps) return res.notFound();

      var data = {};

      async.eachSeries(renderProps.components, function(component, callback) {

        var subComponents = component.displayName
          ? [component]
          : _.values(component);
        async.eachSeries(subComponents, function(component, callback) {
          var loader = module.exports.loaders[component.loaderKey || component.displayName];
          if (!loader) return callback();
          //if (!module.exports.loaders[component.displayName]) return callback(new Error("Component data loader not found"));
          loader(req, renderProps, (err, result) => {
            if (err) return callback(err);
            _.extend(data, result);
            callback();
          });
        }, callback);
      }, err => {
        if (err) return res.serverError(err);
        renderProps.params.data = data;

//        renderProps.components = _.filter(renderProps.components, component => component.displayName !== "fake");
//console.log(999, renderProps.components);
        try {
          var content = ReactDOM.renderToString(<ReactRouter.RoutingContext {...renderProps} />)
          res.view("page.ejs", {
            content: content,
            data: data
          });
        } catch(err) {
          res.negotiate(err);
        }
      });
    })
  }
};
