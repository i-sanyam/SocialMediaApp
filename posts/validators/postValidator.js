const fileModule = "posts";

const Joi = require("joi");

const validator = require("./../../validators/vaildator");

exports.createPost = (req, res, next) => {
  req.apiReference = {
    module: fileModule,
    api: 'createPost'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    access_token    : Joi.string().required(),
    text            : Joi.string().required(),
  }).unknown(true), req.body, res)) {
    next();
  }
}

exports.likePost = (req, res, next) => {
  req.apiReference = {
    module: fileModule,
    api: 'likePost'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    access_token    : Joi.string().required(),
    post_id         : Joi.number().required(),
    is_liked        : Joi.boolean().required(),
  }).unknown(true), req.body, res)) {
    next();
  }
}

exports.getPosts = (req, res, next) => {
  req.apiReference = {
    module: fileModule,
    api: 'getPosts'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    access_token    : Joi.string().required(),
    home_feed       : Joi.boolean().required(),
    limit           : Joi.number().required(),
    offset          : Joi.number().required(),
  }).unknown(true), req.body, res)) {
    next();
  }
}