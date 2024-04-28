const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
});


module.exports = mongoose.model("Message", MessageSchema);
