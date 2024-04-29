const express = require("express");
const router = express.Router();
const post_controller = require("../controllers/postController")
const comment_controller = require("../controllers/commentController")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

router.get("/", verifyToken, verifyJWT, post_controller.get);

router.get("/:id", comment_controller.get);

router.post("/create", verifyToken, verifyJWT, post_controller.create);

router.post("/:id/update", verifyToken, verifyJWT, post_controller.update);

function verifyJWT(req, res, next) {
  jwt.verify(req.token, dotenv.parsed.SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      next();
    }
  })
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}

module.exports = router;