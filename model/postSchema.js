const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  created_by: { type: String, required: true },
  content: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true, default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  created_at: { type: Date, required: true },
  upvotes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  is_active: { type: Boolean, default: true },
});
// Enable geospatial indexing

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
module.exports = Post;
