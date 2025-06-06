const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    telegramId: { type: String, required: true, unique: true },
    username: { type: String },
    city: { type: String },
    isBlocked: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
