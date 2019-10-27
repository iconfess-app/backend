const mongoose = require('mongoose');

const { Schema } = mongoose;

const anonConfessionSchema = new Schema(
  {
    description: { type: String, required: true },
    category: { type: String, required: true },
    isDestroyed: { type: Boolean, default: true },
    date: { type: String },
    time: { type: String },
    user: { type: String, default: 'Anonymous' },
    likesCounter: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const AnonymousConfession = mongoose.model('AnonymousConfession', anonConfessionSchema);

module.exports = AnonymousConfession;
