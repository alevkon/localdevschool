RouterService.loaders["authorCourse"] = function(req, context, callback) {
  Unit.find({course: context.params.course}).populate('course').exec( function(err, units) {
    if (err) return callback(err);
    if (!units) return callback(err);
    var data = {
      units: units
    };
    console.log(data);
    callback(null, data);
  })
};
