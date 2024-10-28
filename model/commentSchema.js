// models/Comment.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference to the Post model
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
module.exports = Comment;