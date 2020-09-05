const Joi = require('Joi');

const logging = require('../logging/logging');

exports.validateFields = function (apiReference, schema, req, res) {
  logging.log(apiReference, {'REQUEST_BODY' : req});
  let validation = Joi.validate(req, schema);
    if(validation.error) {
        let errorReason =
                validation.error.details !== undefined
                    ? validation.error.details[0].message
                    : 'Parameter missing or parameter type is wrong';
     
        logging.logError(apiReference, errorReason);
        return false;
    }
    return true;
}