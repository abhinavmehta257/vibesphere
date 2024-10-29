import RateLimit from "../model/rateLimit";
import dbConnect from "../db/dbConnect"; // Assumes you have a dbConnect function for MongoDB
import cookies from "next-cookies";

const RATE_LIMIT_WINDOW = process.env.RATE_LIMIT_WINDOW * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = process.env.RATE_LIMIT_MAX_REQUESTS;

export default async function rateLimit(req, res) {
  await dbConnect();

  const { user_id } = cookies({ req });

  // Check if user has an existing rate limit record in MongoDB
  let record = await RateLimit.findOne({ user_id });

  if (!record) {
    // No record exists, create a new one with an expiration time
    const expiresAt = new Date(Date.now() + RATE_LIMIT_WINDOW);
    await RateLimit.create({ user_id, count: 1, expiresAt });
    return true;
  }

  // If the rate limit window has expired, reset the count and expiration time
  if (Date.now() > record.expiresAt.getTime()) {
    record.count = 1;
    record.expiresAt = new Date(Date.now() + RATE_LIMIT_WINDOW);
    await record.save();
    return true;
  }

  // If the rate limit window has not expired, check the request count
  if (record.count < RATE_LIMIT_MAX_REQUESTS) {
    // Increment the request count
    record.count += 1;
    await record.save();
    return true;
  }

  // If rate limit is exceeded
  res.setHeader(
    "Retry-After",
    Math.ceil((record.expiresAt.getTime() - Date.now()) / 1000)
  );
  res.status(429).json({
    message: `Too many requests, please try again after ${Math.ceil(
      RATE_LIMIT_WINDOW / (60 * 1000)
    )} minutes.`,
  });
  return false;
}
