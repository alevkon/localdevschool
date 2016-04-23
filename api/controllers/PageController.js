var React = require("react");
var Registry = require("../../assets/core/stores/registry");
var Context = require("../../assets/core/stores/context");
var MobileDetect = require("mobile-detect");
var ReactDOM = require("react-dom/server");

module.exports = {
  serve(req, res) {
    RouterService.serve(req, res);
  }
};
