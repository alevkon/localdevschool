RouterService.loaders["authorUnit"] = function(req, context, callback) {
  callback(null, {
    unit: {
      id: context.params.unit
    }
  });
};