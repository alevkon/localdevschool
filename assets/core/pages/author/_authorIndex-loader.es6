RouterService.loaders["authorIndex"] = function(req, context, callback) {
  Course.find({}, function(err, courses) {
    if (err) return callback(err);

    var data = {
      courses: courses
    };

    callback(null, data);
  })
};
