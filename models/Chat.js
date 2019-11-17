const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    message: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String },
  },
  { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
