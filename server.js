const Express = require("express");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const { Router } = require('./routes');
app.use('/api', Router);