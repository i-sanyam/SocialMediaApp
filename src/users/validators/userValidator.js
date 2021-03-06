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
    email       : Joi.string().email().optional(),
    phone       : Joi.string().max(10).optional(),
  }).unknown(true), req.body, res)) {
    next();
  }
}

exports.userFollow = (req, res, next) => {
  req.apiReference = {
    module: fileModule,
    api: 'follow'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    is_follow         : Joi.boolean().required(),
    to_follow_user_id : Joi.string().required(),
  }).unknown(true), req.body, res)) {
    req.body.is_follow = (req.body.is_follow == 'true');
    next();
  }
}

exports.getProfile = (req, res, next) => {
  req.apiReference = {
    module: fileModule,
    api: 'getProfile'
  };
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    user_id : Joi.string().optional(),
    is_posts: Joi.boolean().required(),
    offset  : Joi.number().optional(),
    limit   : Joi.number().optional(),
  }).unknown(true), req.body, res)) {
    req.body.is_posts = (req.body.is_posts == "true");
    next();
  }
}