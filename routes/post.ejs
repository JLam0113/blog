const express = require("express");
const router = express.Router();
const passport = require("passport");
const Message = require("../models/message");
const message_controller = require("../controllers/messageController")

// TODO Message routes

router.get("/", async (req, res) => {
  const allMessages = await Message.find().sort({ name: 1 }).exec();
  console.log(allMessages);
  res.render("index", { user: req.user, messages: allMessages });
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/message", message_controller.create);

module.exports = router;