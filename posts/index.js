const postRoute = require("express").Router();
const postValidator = require('./validators/postValidator');
const postController = require('./controllers/postController');

postRoute.post("/create", postValidator.create, postController.create);

exports = module.exports = {postRoute};