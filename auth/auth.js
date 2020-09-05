const { responseMessages } = require("../properties/constants");

const responses = require('../responses/responses');
const constants = require('../properties/constants');
const config = require('../config/config');

exports.verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      jwt.verify(bearerToken, config.TOKEN_SECRET, (err, authData) => {
        if (err) {
          throw Error();
        }
        req.userDetails = authData.userDetails;
        next();
      });
    } else {
      throw Error();
    }
  } catch (authError) {
    return responses.sendResponse(res, constants.responseMessages.FORBIDDEN, constants.responseFlags.FORBIDDEN);
  }
}