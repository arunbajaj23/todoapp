var express = require("express");
var router = express.Router();
const schemas = require("../joiModelValidation/schemas");
const middleware = require("../joiModelValidation/middleware");
const db = require("../models");
const helper = require("../helper/helper");
const config = require("../config/common.config");
const jwt = require("jsonwebtoken");
const multer  = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../uploads/'))
  },
  filename: function (req, file, cb) {
      cb(null, 'photo'+"-"+Date.now()+path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
/* middleware is used to validate the req data with joi schema */


/* post request for create user through email . */
router.post(
  "/create",upload.single('photo'),
  middleware.requireSchemaValidation(schemas.createUserPOST),
  async function (req, res, next) {
    try {
      const userData = await db.User.findOne({
        where: {
          email: req.body.email,
        },
        raw: true,
      });
      if (userData == null) {
        req.body.password = await helper.generatePasswordHash(
          req.body.password,
          10
        );
        const userData = {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
          photo: req.file.filename
        };
        
        db.User.create(userData)
          .then((newUser) =>{
            const token = jwt.sign(newUser.get({plain:true}), config.SECRET, {
              expiresIn: config.TOKEN_EXPIRES_IN,
            });
            res.send({
              response: 1,
              sys_message:
                "Success",
              data: {token,email: req.body.email,username: req.body.username,photo: req.file.filename},
            })
          })
          .catch((error) => {
            res.send({ response: 0, sys_message: error.message });
          });
      } else {
        var  sys_message=
          "Email Address: " +
              req.body.email +
              " is already registered";
        res.send({
          response: 0,
          sys_message
        });
      }
    } catch (e) {
      res.send({ response: 0, sys_message: e.message });
    }
  }
),




/* post request for login through email address and password  . */
  router.post(
    "/login",
    middleware.requireSchemaValidation(schemas.loginUserPOST),
    async function (req, res, next) {
      try {
        const userData = await db.User.findOne({
          where: {
            email: req.body.email,
          },
          raw: true,
        });
        if (userData != null) {
            var match = await helper.checkPasswordHash(
              req.body.password,
              userData["password"]
            );
            if (match) {
                const token = jwt.sign(userData, config.SECRET, {
                  expiresIn: config.TOKEN_EXPIRES_IN,
                });
                res.send({
                  response: 1,
                  sys_message: "sucess",
                  data: {
                    token,
                    username: userData["username"],
                    email: userData["email"],
                    photo: userData['photo']
                  },
                });
              
            } else {
              res.send({ response: 0, sys_message: "Incorrect password" });
            }
        } else {
          res.send({ response: 0, sys_message: "Invalid email and password" });
        }
      } catch (e) {
        res.send({ response: 0, sys_message: e.message });
      }
    }
  ),


  (module.exports = router);
