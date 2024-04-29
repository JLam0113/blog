const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, required: true },
  post: { type: Schema.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", CommentSchema);
