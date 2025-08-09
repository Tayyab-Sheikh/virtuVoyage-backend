const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
    },
    touristId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: "custom",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
