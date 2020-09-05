const jwt = require('jsonwebtoken');
const hash = require('salted-md5');
const _ = require('underscore')
const config = require("../../config/config");

const userService = require('../services/userService');
const logging = require('../../logging/logging');
const responses = require('../../responses/responses');
const constants = require('../../properties/constants');

exports.login = async (req, res) => {
  try {
    let userDetails = await userService.getUser(req.apiReference, {
      username: req.body.username,
      password: hash(req.body.password, config.SALT),
    });
    if (_.isEmpty(userDetails)) throw new Error(constants.responseFlags.LOGIN_ERROR);
    userDetails = {
      user_id : userDetails[0].user_id,
    };

    jwt.sign({ userDetails }, config.TOKEN_SECRET, { expiresIn: config.SESSION_EXPIRY }, (err, token) => {
      res.cookie('access_token', token).status(200).send('Success Login');
    });
  } catch (loginError) {
    logging.logError(apiReference, {EVENT: 'Login Error', ERROR: loginError});
    if (loginError.message == constants.responseFlags.LOGIN_ERROR) {
      responses.sendResponse(res, constants.responseMessages.LOGIN_ERROR, constants.responseMessages.LOGIN_ERROR);
    }
    responses.sendResponse(res, constants.responseMessages.ERROR_IN_EXECUTION, constants.responseFlags.ERROR_IN_EXECUTION);
  }
};