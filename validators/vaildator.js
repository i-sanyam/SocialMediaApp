const Joi = require('Joi');

const logging = require('../logging/logging');
const responses = require('../responses/responses');
const constants = require('../properties/constants');

exports.validateFields = function (apiReference, schema, req, res) {
  logging.log(apiReference, {'REQUEST_BODY' : req});
  let validation = Joi.validate(req, schema);
    if(validation.error) {
        let errorReason =
                validation.error.details !== undefined
                    ? validation.error.details[0].message
                    : 'Parameter missing or parameter type is wrong';
     
        logging.logError(apiReference, errorReason);
        responses.sendResponse(res, errorReason, constants.responseFlags.PARAMETER_MISSING);
        return false;
    }
    return true;
}