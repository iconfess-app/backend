const mongoose = require("mongoose");

const { Schema } = mongoose;

const confessionSchema = new Schema(
  {
    description: { type: String, required: true },
    category: { type: Array, required: true },
    isDestroyed: { type: Boolean, default: true },
    date: { type: String },
    time: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Confession = mongoose.model("Confession", confessionSchema);

module.exports = Confession;
