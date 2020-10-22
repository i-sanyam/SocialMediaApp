const fileModule = "posts";

const Joi = require("joi");

const validator = require("../../validators/vaildator");

exports.createPost = (req, res, next) => {
  req.apiReference = {
    module: fileModule,
    api: 'createPost'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    title           : Joi.string().min(10, 'utf8').max(200, 'utf8').required(),
    text            : Joi.string().min(20, 'utf8').max(500, 'utf8').required(),
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
    post_id         : Joi.number().required(),
    is_liked        : Joi.boolean().required(),
  }).unknown(true), req.body, res)) {
    req.body.is_liked = (req.body.is_liked == "true");
    next();
  }
}

exports.getPosts = (req, res, next) => {
  req.apiReference = {
    module: fileModule,
    api: 'getPosts'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    home_feed       : Joi.boolean().required(),
    limit           : Joi.number().required(),
    offset          : Joi.number().required(),
    profile_feed    : Joi.boolean().optional(),
  }).unknown(true), req.body, res)) {
    next();
  }
}