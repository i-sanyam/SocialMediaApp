const Express = require("express");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

global.app = app;

require('./comments');
require('./posts');