const Joi = require("joi");
const schemas = {
  createUserPOST: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(30),
    username: Joi.string().required().min(4).max(30),
  }),
  loginUserPOST: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(30),
  }),
  createToDoTaskPOST:Joi.object().keys({
    content: Joi.string().required(),
  }),
  updateToDoTaskPOST:Joi.object().keys({
    content: Joi.string().required(),
    todoid: Joi.number().required()
  }),
  completeToDoTaskPOST:Joi.object().keys({
    todoid: Joi.number().required()
  }),
  getToDoTaskListGET:Joi.object().keys({
    status: Joi.string().valid('A','C').required()
  }),
  
};
module.exports = schemas;
