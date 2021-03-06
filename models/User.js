const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    isOver16: { type: Boolean, required: true },
    userConfessions: [{ type: Schema.Types.ObjectId, ref: 'Confession' }],
    allowsLocation: { type: Boolean, default: false },
    allowsContact: { type: Boolean, default: false },
    lightMode: { type: Boolean, default: false },
    avatar: { type: String, default: 'https://iconfess.netlify.com/images/avatar1.svg' },
    token: { type: String },
    tokenExp: { type: Number },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
