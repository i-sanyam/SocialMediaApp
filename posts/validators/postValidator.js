const fileModule = "posts";

const Joi = require("joi");
const validator = require("./../../validators/vaildator");

export function createPost (req, res, next) {
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