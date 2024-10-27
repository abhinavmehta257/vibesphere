import Vote from '../../model/voteSchema';
import Post from '../../model/postSchema';

export default async (req, res) => {
  const { postId, voteType } = req.body;
  const voterIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(postId, voteType);
    
  try {
    // Check if the user has already voted on this post
    const existingVote = await Vote.findOne({ post_id: postId, voter_ip: voterIp });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted on this post' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const vote = new Vote({
      post_id: postId,
      voter_ip: voterIp,
      vote: voteType
    });
    await vote.save();

    if (voteType === 'upvote') {
      post.upvotes += 1;
    } else {
      post.downvotes += 1;
    }
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error processing vote' });
  }
};
