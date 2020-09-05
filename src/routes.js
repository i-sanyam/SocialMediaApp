const Router = require('express').Router();

const {postRoute} = require('./posts/index');
const { commentRoute } = require('./comments/index');
const { userRoute } = require('./users/index');

Router.use('/post', postRoute);
Router.use('/comment', commentRoute);
Router.use('/user', userRoute);

exports = module.exports = {Router};