const Express = require("express");
const cookieParser = require('cookie-parser')

const app = Express();

const auth = require('./auth/auth');
const posts = require('./posts/services/postService');

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", auth.verifyToken, async (req, res) => { // homepage
  let posts = await posts.getPosts({
    user_id: req.userDetails.user_id,
    home_feed: true,
    limit: 25,
    offset: 0,
  });
  // hbs give homepage
});

const { Router } = require('./routes');
app.use('/api', Router);

app.listen(2211, () => {
  console.log("Server started on localhost:2211")
});