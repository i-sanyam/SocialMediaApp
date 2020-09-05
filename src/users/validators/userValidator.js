const fileModule = "user";

const Joi = require("joi");

const validator = require("../../validators/vaildator");

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

exports.signup = (req, res, next) => {
  req.apiReference = {
    module: fileModule,
    api: 'signup'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    first_name  : Joi.string().max(50).required(),
    last_name   : Joi.string().max(50).optional(),
    username    : Joi.string().max(40).required(),
    password    : Joi.string().required(),
    email       : Joi.email().optional(),
    phone       : Joi.string().max(10).optional(),
  }).unknown(true), req.body, res)) {
    next();
  }
}