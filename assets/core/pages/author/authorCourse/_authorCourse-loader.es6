RouterService.loaders["authorCourse"] = function(req, context, callback) {
  callback(null, {
    course: {
      id: context.params.course
    }
  });
};