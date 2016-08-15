RouterService.loaders["index"] = function(req, res, context, callback) {
  Author.find({}).exec(function(err, author) {
    if (err) callback(err);
    if (!author) callback(null, {});
    var data = {
      author: author
    };
    callback(null, data);
  })

};
