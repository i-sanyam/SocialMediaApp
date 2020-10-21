const jwt = require('jsonwebtoken');
const hash = require('salted-md5');
const _ = require('underscore')
const config = require("../../config/config");

const userService = require('../services/userService');
const logging = require('../../logging/logging');
const responses = require('../../responses/responses');
const constants = require('../../properties/constants');
const postService = require('../../posts/services/postService');

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
      res.cookie('access_token', token);
      responses.sendResponse(res, constants.responseMessages.ACTION_COMPLETE, constants.responseFlags.ACTION_COMPLETE);
    });
  } catch (loginError) {
    logging.logError(req.apiReference, {EVENT: 'Login Error', ERROR: loginError});
    if (loginError.message == constants.responseFlags.LOGIN_ERROR) {
      return responses.sendResponse(res, constants.responseMessages.LOGIN_ERROR, constants.responseFlags.LOGIN_ERROR);
      // return res.status(constants.responseFlags.LOGIN_ERROR).redirect('/login'); // LOGIN LOOP
    }
    return responses.sendResponse(res, constants.responseMessages.ERROR_IN_EXECUTION, constants.responseFlags.ERROR_IN_EXECUTION);
    // return res.status(constants.responseFlags.ERROR_IN_EXECUTION).redirect('/login'); // login loop
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
      last_name: req.body.last_name || null,
      phone: req.body.phone || null,
      email: req.body.email || null,
    });
    return responses.sendResponse(res, constants.responseMessages.ACTION_COMPLETE, constants.responseFlags.ACTION_COMPLETE);
  } catch (signupError) {
    logging.logError(req.apiReference, {EVENT : "User Signup Error", ERROR: signupError.message});
    return res.status(constants.responseFlags.ERROR_IN_EXECUTION);
  }
}

exports.getProfile = async (req, res) => {
  req.apiReference = {
    module: 'user',
    api: 'getProfile'
  };
  try {
    let userDetails = await userService.getUser(req.apiReference, {
      user_id  : (req.body.user_id) ? req.body.user_id: req.userDetails.user_id,
      is_active: 1,
      columns  : 'user_id, first_name, last_name, username, bio, is_private',
    });
    if (_.isEmpty(userDetails)) {
      return responses.sendResponse(res, constants.responseMessages.ACTION_COMPLETE, constants.responseFlags.ACTION_COMPLETE, []);
    }
    userDetails = userDetails[0];
    let isFollow = 2; //0 - not 1 - followed, 2 - own account
    if (req.body.is_posts && req.body.user_id && (req.body.user_id != req.userDetails.user_id) && userDetails.is_private) {
      let followStatus = await userService.getFollowStatus(req.apiReference, {
        user_id: req.userDetails.user_id, // user who is requesting the profile
        profile_id: req.body.user_id, // user profile to see
      });
      if (!_.isEmpty(followStatus)) {
        console.log(followStatus);
        isFollow = followStatus[0].is_followed;
      } else {
        isFollow = 0;
      }
    }
    if (req.body.is_posts && isFollow) {
        let posts = await postService.getPosts(req.apiReference, {
          profile_feed: 1,
          user_id: req.body.user_id,
          offset: req.body.offset || 0,
          limit: req.body.limit || 25,
        });
        userDetails.posts = posts;
    }
    return responses.sendResponse(res, constants.responseMessages.ACTION_COMPLETE, constants.responseFlags.ACTION_COMPLETE, userDetails);
  } catch (profileError) {
    logging.logError(req.apiReference, {EVENT: "Error in getting user Profile", ERROR: profileError});
    return responses.sendResponse(res, constants.responseMessages.ERROR_IN_EXECUTION, constants.responseFlags.ERROR_IN_EXECUTION);
  }
}

exports.userFollow = async (req, res) => {
  try {
    console.log('### Enter')
    await userService.userFollow(req.apiReference, {
      user_id           : req.userDetails.user_id,
      is_follow         : req.body.is_follow,
      to_follow_user_id : req.body.to_follow_user_id,
    });
    console.log('###');
    return responses.sendResponse(res, constants.responseMessages.ACTION_COMPLETE, constants.responseFlags.ACTION_COMPLETE);
  } catch (followError) {
    logging.logError(req.apiReference, {EVENT: "Error in following user", ERROR: followError});
    return responses.sendResponse(res, constants.responseMessages.ERROR_IN_EXECUTION, constants.responseFlags.ERROR_IN_EXECUTION);
  }
}

exports.searchQuery = async function(req, res) {
  req.apiReference = {
    module: 'user',
    api: 'searchQuery'
  };

  try {
    console.log(req.params);
    if (!req.params.query) throw new Error();
    let results = [];
    if (req.params.query.toString().length > 2) {
      results = await userService.searchQuery(req.apiReference, {
        query: req.params.query
      });
    }
    return responses.sendResponse(res, constants.responseMessages.ACTION_COMPLETE, constants.responseFlags.ACTION_COMPLETE, results);

  } catch(queryError) {
    logging.logError(req.apiReference, {EVENT: "search query Error", ERROR: queryError});    
    return responses.sendResponse(res, constants.responseMessages.ERROR_IN_EXECUTION, constants.responseFlags.ERROR_IN_EXECUTION);
  }

}