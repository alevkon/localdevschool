RouterService.loaders["authorUnit"] = function(req, context, callback) {
  Unit.findOne({slug: context.params.unit_slug}, function(err, unit) {
    if (err) return callback(err);
    var data = {
      unit: unit
    };
    callback(null, data);
  })
};
