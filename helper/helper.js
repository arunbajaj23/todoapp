
const bcrypt = require("bcrypt");


module.exports = {

 /* generate password hash for plain password */
  generatePasswordHash: (password, salt) => {
    return new Promise((res, rej) => {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          rej(err);
        } else {
          res(hash);
        }
      });
    });
  },


 /* check plain password and hash stored in db */
  checkPasswordHash: (password, hash) => {
    return new Promise((res, rej) => {
      bcrypt.compare(password, hash).then(function (result) {
        res(result);
      });
    });
  },

};
