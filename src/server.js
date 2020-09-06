const Express = require("express");
const cookieParser = require('cookie-parser')

const https = require('https');
const fs = require('fs');
const app = Express();

const auth = require('./auth/auth');
const posts = require('./posts/services/postService');
const path = require('path');

const key = fs.readFileSync(__dirname + '/../selfsigned.key');
const cert = fs.readFileSync(__dirname + '/../selfsigned.crt');

const config = require('./config/config');

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use("/", auth.verifyToken, async (req, res) => { // homepage
//   // i will hit api /api/posts/getPosts
//   let posts = await posts.getPosts({
//     user_id: req.userDetails.user_id,
//     home_feed: true,
//     limit: 25,
//     offset: 0,
//   });
//   // hbs give homepage
// });

app.use('/css', Express.static(path.resolve('../public/css')));
app.use('/js', Express.static(path.resolve('../public/js')));
app.use('/app', Express.static(path.resolve('../public/app')));
app.use('/components', Express.static(path.resolve('../public/components')));

app.get('/', (req, res) => {
  auth.verifyToken(req, {
    // status: () => {
    // return {
    send: () => {
      return res.redirect('/login');
    }
    // }
    // }
  }, () => {
    console.error("passed");
    return res.sendFile(path.resolve('../public/index.html'));
  });
});

app.use('/login', (req, res) => {
  auth.verifyToken(req, {
    // status: () => {
    // return {
    send: () => {
      return res.sendFile(path.resolve('./../public/components/login.html'));
    }
    // }
    // }
  }, () => {
    console.error("passed");
    return res.sendFile(path.resolve('../public/index.html'));
  });
});

app.use('/signup', (req, res) => {
  auth.verifyToken(req, {
    // status: () => {
    // return {
    send: () => {
      return res.sendFile(path.resolve('./../public/components/signup.html'));
    }
    // }
    // }
  }, () => {
    console.error("passed");
    return res.sendFile(path.resolve('../public/index.html'));
  });
});

const { Router } = require('./routes');
app.use('/api', Router);

const server = https.createServer({
  key, cert
}, app);

server.listen(config.PORT, () => {
  console.log(`Server started on localhost:${config.PORT}`);
});