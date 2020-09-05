const postServices = require('../services/postService');
const responses = require('../../responses/responses');
const constants = require('../../properties/constants');

exports.createPost =  async function (req, res) {
  // verify access token from middleware
  // and get UserDetails in req.

  try {
    await postServices.createPost(req.apiReference, {
      text: req.body.text,
      author_id: author_id, // modofy
    });
    return responses.sendResponse(
      res,
      constants.responseMessages.ACTION_COMPLETE,
      constants.responseFlags.ACTION_COMPLETE
    );
  } catch (createPostError) {
      return responses.sendResponse(
        res,
        constants.responseMessages.ERROR_IN_EXECUTION,
        constants.responseFlags.ERROR_IN_EXECUTION
      );
  }
}

exports.likePost = async function (req, res) {
  // verify access token from middleware
  // and get UserDetails in req.

  try {
    req = req.body;
    // to implement tb post like relationship
    await postServices.likePost(req.apiReference, {
      post_id: req.post_id,
      liked_by_id: author_id, // modify, and to implement
      is_liked: req.is_liked,
    });
    return responses.sendResponse(
      res,
      constants.responseMessages.ACTION_COMPLETE,
      constants.responseFlags.ACTION_COMPLETE
    );
  } catch (createPostError) {
      return responses.sendResponse(
        res,
        constants.responseMessages.ERROR_IN_EXECUTION,
        constants.responseFlags.ERROR_IN_EXECUTION
      );
  }
}

exports.getPosts = async function (req, res) {
  // verify access token from middleware
  // and get UserDetails in req.

  try {
    req = req.body;
    let posts = await postServices.getPosts(req.apiReference, {
      user_id: req.user_id,// to modify
      home_feed: req.home_feed,
      limit: req.limit,
      offset: req.offset,
    });
    return responses.sendResponse(
      res,
      constants.responseMessages.ACTION_COMPLETE,
      constants.responseFlags.ACTION_COMPLETE,
      posts
    );
  } catch (createPostError) {
      return responses.sendResponse(
        res,
        constants.responseMessages.ERROR_IN_EXECUTION,
        constants.responseFlags.ERROR_IN_EXECUTION
      );
  }
}