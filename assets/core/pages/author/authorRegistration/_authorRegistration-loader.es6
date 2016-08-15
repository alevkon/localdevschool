RouterService.loaders["authorRegistration"] = function(req, res, context, callback) {

  function convertToSlug(str) {
    return str
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-')
      ;
  }

  if (req.method == 'POST') {

    var name = req.param('name');
    var slug = convertToSlug(name);
    var email = req.param('email');
    var password = req.param('password');
    AuthService.encryptPassword(password, function (err, hash) {
      if (err) callback(err);

      Author
        .create({name: name, email: email, passwordHash: hash, slug: slug})
        .exec(function (err, user) {
          if (err) {
            callback(null, {message: 'Database Error'});
            return;
          }

          req.session.user = user;
          req.session.isAuthorized = true;

          res.redirect('/author/' + slug);

        });
    });
    } else {
      callback(null, {
        message: 'Hello, please, login!'
    });

  }
};
