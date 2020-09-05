const postServices = require('../services/postService');
const responses = require('../../responses/responses');
const constants = require('../../properties/constants');

export async function createPost(req, res) {
  // verify access token from middleware
  // and get UserDetails in req.

  try {
    await postServices.createPost(req.apiReference, {
      text: req.text,
      author_id: author_id
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