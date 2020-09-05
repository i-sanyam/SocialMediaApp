const userRoute = require("express").Router();

const userValidator = require('./validators/userValidator');
const userController = require('./controllers/userController');

userRoute.post('/login', userValidator.login, userController.login);

exports = module.exports = {userRoute};