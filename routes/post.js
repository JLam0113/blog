const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../models/post");
const post_controller = require("../controllers/postController")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
// TODO Message routes

router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, dotenv.parsed.SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const allPosts = await Post.find().sort({ name: 1 }).exec();
      console.log(allPosts);
      res.json({ posts: allPosts, authData});
    }
  })
});

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}

router.post("/create", post_controller.create);

module.exports = router;