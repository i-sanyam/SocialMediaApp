const fileModule = "comments";

const Joi = require("joi");

const validator = require("./../../validators/vaildator");

exports.createComment = function (req, res, next) {
  req.apiReference = {
    module: fileModule,
    api: 'createComment'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    access_token    : Joi.string().required(),
    text            : Joi.string().required(),
    post_id         : Joi.number().required(),
  }).unknown(true), req.body, res)) {
    next();
  }
}

exports.likeComment = function (req, res, next) {
  req.apiReference = {
    module: fileModule,
    api: 'likeComment'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    access_token    : Joi.string().required(),
    comment_id      : Joi.number().required(),
    post_id         : Joi.number().optional(),
    is_liked        : Joi.boolean().required(),
  }).unknown(true), req.body, res)) {
    next();
  }
}

exports.getComments = function (req, res, next) {
  req.apiReference = {
    module: fileModule,
    api: 'getComments'
  }
  
  if (validator.validateFields(req.apiReference, Joi.object().keys({
    access_token    : Joi.string().required(),
    post_id         : Joi.number().required(),
    limit           : Joi.number().required(),
    offset          : Joi.number().required(),     
  }).unknown(true), req.body, res)) {
    next();
  }
}