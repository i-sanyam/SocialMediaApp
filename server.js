const Express = require("express");
const cookieParser = require('cookie-parser')

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", Express.static(__dirname + "/public"));

const { Router } = require('./routes');
app.use('/api', Router);

app.listen(2211, () => {
  console.log("Server started on localhost:2211")
});