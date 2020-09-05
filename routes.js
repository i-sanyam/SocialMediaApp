const Router = require('express').Router();

const {postRoute} = require('./posts/index');
const { commentRoute } = require('./comments/index');

Router.use('/post', postRoute);
Router.use('/comment', commentRoute);

exports = module.exports = {Router};