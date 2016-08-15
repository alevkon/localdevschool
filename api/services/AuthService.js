var bcrypt = require("bcryptjs");
var saltRounds = 5;

module.exports = {
  encryptPassword: function(password, callback) {
    bcrypt.hash(password, saltRounds, callback);
  }
};
