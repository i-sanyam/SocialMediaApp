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
      res.cookie('access_token', token)
      .status(constants.responseFlags.ACTION_COMPLETE)
      .redirect('/');
    });
  } catch (loginError) {
    logging.logError(apiReference, {EVENT: 'Login Error', ERROR: loginError});
    if (loginError.message == constants.responseFlags.LOGIN_ERROR) {
      // responses.sendResponse(res, constants.responseMessages.LOGIN_ERROR, constants.responseMessages.LOGIN_ERROR);
      return res.status(constants.responseFlags.LOGIN_ERROR).redirect('/login');
    }
    // responses.sendResponse(res, constants.responseMessages.ERROR_IN_EXECUTION, constants.responseFlags.ERROR_IN_EXECUTION);
    return res.status(constants.responseFlags.ERROR_IN_EXECUTION).redirect('/login');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('access_token');
  res.status(constants.responseFlags.ACTION_COMPLETE).redirect('/login');
}

exports.signup = async (req, res) => {
  try {
    let userDetails = await userService.getUser(req.apiReference, {
      username: req.body.username,
    });
    if (!_.isEmpty(userDetails)) return responses.sendResponse(res, constants.responseMessages.USERNAME_EXISTS, constants.responseFlags.FORBIDDEN);
    await userService.insertUser(req.apiReference, {
      password: hash(req.body.password, config.SALT),
      first_name: req.body.first_name,
      username: req.body.username,
      last_name: req.body.last_name || '',
      phone: req.body.phone || '',
      email: req.body.email || '',
    });
    return res.status(constants.responseFlags.ACTION_COMPLETE).redirect('/login');
  } catch (signupError) {
    logging.logError(req.apiReference, {EVENT : "User Signup Error", ERROR: signupError.message});
    return res.status(constants.responseFlags.ERROR_IN_EXECUTION).redirect('/signup');
  }
}