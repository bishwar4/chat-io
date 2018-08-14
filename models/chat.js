const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  unique: {
    type: String
  },
  conversation: [
    {
      username: String,
      message: String,
      time: { type: Date, default: Date.now }
    }
  ]
});

module.exports = Chat = mongoose.model("chat", UserSchema);
