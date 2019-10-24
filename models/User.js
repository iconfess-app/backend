const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    age: { type: Number, required: true },
    userConfessions: [{ type: Schema.Types.ObjectId, ref: 'Confession' }],
    allowsLocation: { type: Boolean, default: false },
    allowsContact: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: true },
    avatar: { type: String, default: 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png' },
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
