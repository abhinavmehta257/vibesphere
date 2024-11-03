const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: String, // Assuming userId is a string; change to ObjectId if needed
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  is_read: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
