const Post = require("../models/post");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().sort({ name: 1 }).exec();
  res.json({ posts: allPosts })
});

exports.create = [
  body("title", "title must be specified").trim().isLength({ min: 1 }).escape(),
  body("content", "content must be specified").trim().isLength({ min: 1 }).escape(),
  body("published", "published must be specified").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      date: new Date(),
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      res.sendStatus(500)
    }
    else {
      await post.save();
      res.json({ message: 'Post created' })
    }
  }),];

exports.update = [
  body("title", "title must be specified").trim().isLength({ min: 1 }).escape(),
  body("content", "content must be specified").trim().isLength({ min: 1 }).escape(),
  body("published", "published must be specified").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      date: new Date(),
      published: req.body.published,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.sendStatus(500)
    }
    else {
      await Post.findByIdAndUpdate(req.params.id, post, {});
      res.json({ message: 'Post updated' })
    }
  }),];