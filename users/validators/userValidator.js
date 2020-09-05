const fileModule = "user";

const Joi = require("joi");

const validator = require("./../../validators/vaildator");

exports.login = (req, res, next) => {
  req.apiReference = {
    module: fileModule,
    api: 'login'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    username    : Joi.string().required(),
    password    : Joi.string().required(),
  }).unknown(true), req.body, res)) {
    next();
  }
}