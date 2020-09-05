const commentRoute = require("express").Router();
const commentValidator = require('./validators/commentValidator');
const commentController = require('./controllers/commentController');
const auth = require('../auth/auth');

commentRoute.post("/create", commentValidator.createComment, auth.verifyToken, commentController.createComment);
commentRoute.post('/like', commentValidator.likeComment, auth.verifyToken, commentController.likeComment);
commentRoute.post('/get', commentValidator.getComments, auth.verifyToken, commentController.getComments);

exports = module.exports = {commentRoute};