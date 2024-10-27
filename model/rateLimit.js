// models/RateLimit.js
import mongoose from "mongoose";

const RateLimitSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 },
  expiresAt: { type: Date, required: true },
});

RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // MongoDB TTL Index

export default mongoose.models.RateLimit || mongoose.model("RateLimit", RateLimitSchema);
