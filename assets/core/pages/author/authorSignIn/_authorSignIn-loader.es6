var bcrypt = require("bcryptjs");

RouterService.loaders["authorSignIn"] = function(req, res, context, callback) {
  var redirectURL = req.param('redirectURL') || '';
  if (req.method == 'POST') {
    var email = req.param('email');
    var password = req.param('password');
    Author
      .findOne({email: email})
      .exec(function(err, user) {
        if (err) {
          callback(null, {message: 'Database Error', email: email});
          return;
        }
        if(!user) {
          callback(null, {message: 'Login or password incorrect, try again!', email: email});
          return;
        }
        bcrypt.compare(password, user.passwordHash, function(err, matches) {
          if (err) {
            callback(null, {message: 'Database Error'});
            return;
          }
          if (!matches) {
            callback(null, {message: 'Login or password incorrect, try again!', email: email})
          }
          req.session.user = user;
          req.session.isAuthorized = true;
          // callback(null, {
          //   message: 'You have successfully logged in!',
          //   email: ''
          // });
          res.redirect(redirectURL);
        })
      });
  } else {
    callback(null, {
      message: 'Hello, please, login!',
      email: '',
      redirectURL: redirectURL
    });
  }
};
