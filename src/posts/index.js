const postRoute = require("express").Router();
const postValidator = require('./validators/postValidator');
const postController = require('./controllers/postController');
const auth = require('../auth/auth');

postRoute.post('/create', postValidator.createPost, auth.verifyToken, postController.createPost);
postRoute.post('/like', postValidator.likePost, auth.verifyToken, postController.likePost);
postRoute.post('/get', postValidator.getPosts, auth.verifyToken, postController.getPosts);

exports = module.exports = {postRoute};