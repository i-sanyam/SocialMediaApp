const userRoute = require("express").Router();

const userValidator = require('./validators/userValidator');
const userController = require('./controllers/userController');
const auth = require('../auth/auth');

userRoute.post('/login', userValidator.login, userController.login);
userRoute.get('/logout', auth.verifyToken, userController.logout);

exports = module.exports = {userRoute};