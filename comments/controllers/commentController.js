const commentServices = require('../services/commmentService');
const responses = require('../../responses/responses');
const constants = require('../../properties/constants');

export async function createComment(req, res) {
  // verify access token from middleware
  // and get UserDetails in req.

  try {
    await commentServices.createComment(req.apiReference, {
      text: req.body.text,
      post_id: req.body.post_id,
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