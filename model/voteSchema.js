const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    post_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
    voter_ip: { type: String, required: true }, // To prevent multiple votes per IP
    vote: { type: String, enum: ['upvote', 'downvote'], required: true },
    created_at: { type: Date, default: Date.now }
  });
  
const Vote = mongoose.models.Vote || mongoose.model("Vote", voteSchema);
module.exports = Vote;
