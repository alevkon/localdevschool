RouterService.loaders["authorIndex"] = function(req, res, context, callback) {
  Author.findOne({slug: context.params.author_slug}, function(err, author) {
    if (err) return callback(err);
    Course.find({author: author.id}).populate('author').exec( function(err, courses) {
      if (err) return callback(err);
      if (!courses[0]) {
        var coursesFake = [{}];
        coursesFake[0].empty = true;
        coursesFake[0].author = author;
        coursesFake[0].title = '';
        coursesFake[0].description = '';
        var data = {
          courses: coursesFake
        };
        callback(null, data);

      } else {
        data = {
          author: author,
          courses: courses
        };
        callback(null, data);
      }
    })
  })
};
