const Router = require('express').Router();

const {postRoute} = require('./posts/index');

Router.use('/posts', postRoute);

exports = module.exports = {Router};