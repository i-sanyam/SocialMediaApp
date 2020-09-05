const Express = require("express");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const {postRoute} = require('./posts/index');

app.use('/posts', postRoute);