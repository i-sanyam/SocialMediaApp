const userRoute = require("express").Router();

const userValidator = require('./validators/userValidator');
const userController = require('./controllers/userController');
const auth = require('../auth/auth');

userRoute.post('/login', userValidator.login, userController.login);
userRoute.get('/logout', auth.verifyToken, userController.logout);
userRoute.post('/signup', userValidator.signup, userController.signup);
userRoute.post('/profile', auth.verifyToken, userValidator.getProfile, userController.getProfile);
userRoute.post('/follow', userValidator.userFollow, auth.verifyToken, userController.userFollow);
userRoute.get('/search/:query', auth.verifyToken, userController.searchQuery);


exports = module.exports = {userRoute};