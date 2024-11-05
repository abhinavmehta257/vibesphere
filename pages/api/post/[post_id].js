import dbConnect from "../../../db/dbConnect"; // Adjust the path based on your project structure
import Post from "../../../model/postSchema"; // Import your Post model
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

export default async function handler(req, res) {
  const { method } = req;
  const { post_id } = req.query; // Get post_id from the query parameters

  await dbConnect(); // Connect to the database

  if (!post_id) {
    return res.status(500).json({ message: "Error fetching post", error });
  }

  switch (method) {
    case "GET":
      try {
        const [post] = await Post.aggregate([
          {
            $match: {
              _id: new ObjectId(post_id), // Ensure post_id is an ObjectId
              is_active: true, // Optional: Include only active posts
            },
          },
          {
            $addFields: {
              distance: { $toInt: { $divide: ["$distance", 1000] } }, // Convert distance to kilometers and round to integer
            },
          },

          {
            $addFields: {
              score: { $subtract: ["$upvotes", "$downvotes"] }, // Calculate score
            },
          },
          {
            $project: {
              created_by: 1,
              distance: 1,
              location: 1,
              content: 1,
              score: 1,
              comments: 1,
              created_at: 1,
              gifUrl: 1,
            },
          },
        ]);

        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(post); // Return the found post
      } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Error fetching post", error });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" }); // Handle unsupported methods
  }
}
