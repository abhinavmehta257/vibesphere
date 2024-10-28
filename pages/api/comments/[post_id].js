// pages/api/comments/[post_id].js
import generateAnonymousName from '@/utils/generateAnonymousName';
import dbConnect from '../../../db/dbConnect';
import Comment from '../../../model/commentSchema';
import Post from '@/model/postSchema';

export default async function handler(req, res) {
  const { method } = req;
  const { post_id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      // Fetch comments for a specific post
      try {
        const comments = await Comment.find({ post_id });
        return res.status(200).json(comments);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching comments', error });
      }

    case 'POST':
      // Add a new comment to the post
      try {
        const {text } = req.body;

        if (!text) {
          return res.status(400).json({ message: 'User and text are required' });
        }

        const post = await Post.findById(post_id);
        if (!post) {
        return res.status(404).json({ message: 'Post not found' });
        }
        post.comments += 1;
        await post.save();
        const user_name = generateAnonymousName();

        const newComment = await Comment.create({ post_id, created_by:user_name , text });

        return res.status(201).json(newComment);
      } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Error creating comment', error });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
