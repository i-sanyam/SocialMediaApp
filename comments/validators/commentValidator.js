const fileModule = "comments";

const Joi = require("joi");

const validator = require("./../../validators/vaildator");

export function createComment (req, res, next) {
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