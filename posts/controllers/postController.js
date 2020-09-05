const postServices = require('../services/postService');
const responses = require('../../responses/responses');
const constants = require('../../properties/constants');

function create(req, res) {
  // verify access token

  try {
    await postServices.create(req.apiReference, {
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