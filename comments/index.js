const commentRoute = require("express").Router();
const commentValidator = require('./validators/commentValidator');
const commentController = require('./controllers/commentController');

commentRoute.comment("/create", commentValidator.createComment, commentController.createComment);

exports = module.exports = {commentRoute};