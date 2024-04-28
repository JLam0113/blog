const Message = require("../models/message");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.create = [
    body("username", "username must be specified").trim().isLength({ min: 1 }).escape(),
    body("message", "message must be specified").trim().isLength({ min: 1 }).escape(),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const message = new Message({
        username: req.body.username,
        content: req.body.message,
        date: new Date()
        ,
      });

      if (!errors.isEmpty()) {
        console.log("error")
        res.redirect('back');
        return;
      }
      else {
        await message.save();
        res.redirect('back');
      }
  }),];