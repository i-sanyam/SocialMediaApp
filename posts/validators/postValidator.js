const fileModule = "posts";

const Joi = require("joi");
const validator = require("./../../validators/vaildator");

exports.create = create;

function create (req, res, next) {
  req.apiReference = {
    module: fileModule,
    api: 'create'
  }
  
  if (validator.validateFields(apiReference, Joi.object().keys({
    access_token    : Joi.string().required(),
    text            : Joi.string().required(),
  }).unknown(true), req.body, res)) {
    next();
  }
}