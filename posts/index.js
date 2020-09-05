const postRoute = require("express").Router();
const postValidator = require('./validators/postValidator');
const postController = require('./controllers/postController');

postRoute.post("/create", postValidator.createPost, postController.createPost);

exports = module.exports = {postRoute};