const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require("passport");
const Post = require("../models/post");
const dotenv = require('dotenv').config()

router.get("/", async (req, res) => {
  const allPosts = await Post.find().sort({ name: 1 }).exec();
  const filteredPosts = allPosts.filter((post) => post.published == true)
  res.json({ posts: filteredPosts });
});

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }
          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, username: user.username };
              const token = jwt.sign({ user: body }, dotenv.parsed.SECRET, { expiresIn: '30m' });

              return res.json({ username: user.username, token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router;