import RateLimit from "../model/rateLimit";
import dbConnect from "../db/dbConnect"; // Assumes you have a dbConnect function for MongoDB

const RATE_LIMIT_WINDOW = 1 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3;

export default async function rateLimit(req, res) {
  await dbConnect();

  const ip = req?.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Check if IP has an existing record in MongoDB
  let record = await RateLimit.findOne({ ip });

  if (!record) {
    // If no record, create a new one with an expiration time
    const expiresAt = new Date(Date.now() + RATE_LIMIT_WINDOW);
    await RateLimit.create({ ip, count: 1, expiresAt });
    return true;
  }

  // If the IP already has a record, check the request count
  if (record.count < RATE_LIMIT_MAX_REQUESTS) {
    // Update the request count
    record.count += 1;
    await record.save();
    return true;
  }

  // If rate limit exceeded
  res.setHeader("Retry-After", Math.ceil((record.expiresAt.getTime() - Date.now()) / 1000));
  res.status(429).json({ message: "Too many requests, please try again later." });
  return false;
}

  