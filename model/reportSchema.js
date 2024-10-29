const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  reporter_id: { type: String, required: true }, // Unique ID from cookies/local storage
  created_at: { type: Date, default: Date.now },
});

reportSchema.index({ post_id: 1, reporter_id: 1 }, { unique: true }); // Ensure unique reports per user

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);
module.exports = Report;
