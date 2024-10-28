import dbConnect from '../../../db/dbConnect'; // Adjust the path based on your project structure
import Post from '../../../model/postSchema'; // Import your Post model

export default async function handler(req, res) {
  const { method } = req;
  const { post_id } = req.query; // Get post_id from the query parameters

  await dbConnect(); // Connect to the database

  switch (method) {
    case 'GET':
      try {
        const post = await Post.findById(post_id); // Fetch the post by ID
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(post); // Return the found post
      } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Error fetching post', error });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' }); // Handle unsupported methods
  }
}
