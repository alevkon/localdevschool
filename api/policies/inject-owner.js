module.exports= function (req, res, next) {
  console.log('session is ', req.session);
  console.log('user is ', req.session.user);
  console.log(req.session.isAuthorized);
  next();
};
