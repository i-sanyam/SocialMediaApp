const postServices = require('../services/postService');
const responses = require('../../responses/responses');
const constants = require('../../properties/constants');

exports.createPost =  async function (req, res) {

  try {
    await postServices.createPost(req.apiReference, {
      title: req.body.title,
      text: req.body.text,
      author_id: req.userDetails.user_id,
    });
    return responses.sendResponse(
      res,
      constants.responseMessages.ACTION_COMPLETE,
      constants.responseFlags.ACTION_COMPLETE,
      req.body
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

  try {
    await postServices.likeUnlikePost(req.apiReference, {
      post_id: req.body.post_id,
      liked_by_id: req.userDetails.user_id,
      is_liked: req.body.is_liked,
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
  
  try {
    let posts = await postServices.getPosts(req.apiReference, {
      user_id: req.userDetails.user_id,
      home_feed: req.body.home_feed,
      limit: req.body.limit,
      offset: req.body.offset,
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