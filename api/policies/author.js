module.exports= function (req, res, next) {
  console.log(req.session);
  if (req.url == '/' || ~req.url.indexOf('/authorSignIn') || ~req.url.indexOf('/authorRegistration')) next();
  else if (req.session.isAuthorized == true) {
    next();
  } else {
    res.redirect('/authorSignIn?redirectURL=' + req.url);
  }
};
