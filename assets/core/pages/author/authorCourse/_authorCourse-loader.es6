RouterService.loaders["authorCourse"] = function(req, res, context, callback) {
  Course.findOne({slug: context.params.course_slug}).populate('author').exec(function(err, course) {
    if (err) return callback(err);
    Unit.find({course: course.id}).populate('course').exec( function(err, units) {
      if (err) return callback(err);
      if (!units[0]) {
        var unitsFake = [{}];
        unitsFake[0].empty = true;
        unitsFake[0].course = course;
        unitsFake[0].title = '';
        unitsFake[0].description = '';
        var data = {
          units: unitsFake,
          author: course.author
        };
        callback(null, data);

      } else {
        data = {
          units: units,
          author: course.author
        };
        callback(null, data);
      }
    })
  });

};
