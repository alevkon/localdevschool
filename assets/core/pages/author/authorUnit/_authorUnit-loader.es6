RouterService.loaders["authorUnit"] = function(req, context, callback) {
  Unit.findOne({id: context.params.unit}, function(err, unit) {
    if (err) return callback(err);
    var data = {
      unit: unit
    };
    callback(null, data);
  })
};
