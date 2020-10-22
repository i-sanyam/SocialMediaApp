const commentServices = require('../services/commentService');
const responses = require('../../responses/responses');
const constants = require('../../properties/constants');

exports.createComment = async function (req, res) {

  try {
    await commentServices.createComment(req.apiReference, {
      text: req.body.text,
      post_id: req.body.post_id,
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

exports.likeComment = async function (req, res) {
  
  try {
    // to implement tb_comment_like relationship
    await commentServices.likeUnlikeComment(req.apiReference, {
      comment_id: req.body.comment_id,
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

exports.getComments = async function (req, res) {

  try {
    let comments = await commentServices.getComments(req.apiReference, {
      post_id: req.body.post_id,
      limit: req.body.limit,
      offset: req.body.offset,
    });
    return responses.sendResponse(
      res,
      constants.responseMessages.ACTION_COMPLETE,
      constants.responseFlags.ACTION_COMPLETE,
      comments
    );
  } catch (createPostError) {
      return responses.sendResponse(
        res,
        constants.responseMessages.ERROR_IN_EXECUTION,
        constants.responseFlags.ERROR_IN_EXECUTION
      );
  }
}