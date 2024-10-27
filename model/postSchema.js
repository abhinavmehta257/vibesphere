const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true, default: 'Point' },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    created_at: { type: Date, default: Date.now },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
  });
  postSchema.index({ location: '2dsphere' }); // Enable geospatial indexing
  
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
module.exports = Post;
