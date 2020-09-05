const commentServices = require('./../services/commentService');
const responses = require('../../responses/responses');
const constants = require('../../properties/constants');

exports.createComment = async function (req, res) {
  // verify access token from middleware
  // and get UserDetails in req.

  try {
    req = req.body;
    await commentServices.createComment(req.apiReference, {
      text: req.text,
      post_id: req.post_id,
      author_id: author_id // modify
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

exports.likeComment = async function (req, res) {
  // verify access token from middleware
  // and get UserDetails in req.

  try {
    req = req.body;
    // to implement tb_comment_like relationship
    await commentServices.likeComment(req.apiReference, {
      comment_id: req.comment_id,
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

exports.getComments = async function (req, res) {
  // verify access token from middleware
  // and get UserDetails in req.

  try {
    req = req.body;
    let comments = await commentServices.getComments(req.apiReference, {
      post_id: req.post_id,
      limit: req.limit,
      offset: req.offset,
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