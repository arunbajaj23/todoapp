const Joi = require("joi");
const schemas = require("./schemas");
const config = require("../config/common.config");
const jwt = require("jsonwebtoken");
const middleware = {
  requireVerifiedUserAuthentication: function (req, res, next) {
    let token = req.headers.authorization;
    if (token) {
      jwt.verify(token, config.SECRET, async function (err, decoded) {
        if (err) {
          return res
            .status(401)
            .json({ sys_message: "Failed to authenticate token." });
        } else {
          console.log(decoded);
            req.decoded = decoded;
            next();
         
        }
      });
    }
  },

  requireSchemaValidation: (schema) => {
    return function (req, res, next) {
      const { error } = schema.validate(req.body);
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        console.log("error", message);
        res.status(422).json({ sys_message: message });
      }
    };
  },
};
module.exports = middleware;
