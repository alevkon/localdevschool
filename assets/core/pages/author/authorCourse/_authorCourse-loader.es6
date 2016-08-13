RouterService.loaders["authorCourse"] = function(req, context, callback) {
  Course.findOne({slug: context.params.course_slug}).exec(function(err, course) {
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
          units: unitsFake
        };
        callback(null, data);

      } else {
        data = {
          units: units
        };
        callback(null, data);
      }
    })
  });

};
