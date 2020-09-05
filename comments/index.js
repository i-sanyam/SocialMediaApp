const commentRoute = require("express").Router();
const commentValidator = require('./validators/commentValidator');
const commentController = require('./controllers/commentController');

commentRoute.post("/create", commentValidator.createComment, commentController.createComment);
commentRoute.post('/like', commentValidator.likeComment, commentController.likeComment);
commentRoute.post('/get', commentValidator.getComments, commentController.getComments);

exports = module.exports = {commentRoute};