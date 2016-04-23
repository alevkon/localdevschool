//var rs = require("../api/services/RouterService");

module.exports = {
  routes: {},
  platform: {
    pageRoutes: {
      "/article/:article/edit": "articleEdit",
      "/article/:article": "articleView",
      "/article": "articleView",
      "/": "articleView"
    }
  }
  //
  //  pageRoutes2: [{
  //    path: "/",
  //    component: App,
  //    indexRoute: { component: Dashboard },
  //    childRoutes: [
  //      { path: "about", component: About },
  //      { path: "inbox",
  //        component: Inbox,
  //        childRoutes: [
  //          { path: "/messages/:id", component: Message },
  //          { path: "messages/:id",
  //            onEnter: function (nextState, replaceState) {
  //              replaceState(null, "/messages/" + nextState.params.id)
  //            }
  //          }
  //        ]
  //      }
  //    ]
  //  }]
  //}
};

//_.extend(module.exports.routes, rs.pageRoutesToSails(module.exports.platform.pageRoutes));
