import Vote from "../../model/voteSchema";
import Post from "../../model/postSchema";
import cookies from "next-cookies";

export default async (req, res) => {
  const { postId, voteType } = req.body;
  const { user_id } = cookies({ req });
  console.log(postId, user_id);

  try {
    // Check if the user has already voted on this post
    const existingVote = await Vote.findOne({
      post_id: postId,
      voter_id: user_id,
    });
    if (existingVote) {
      return res
        .status(400)
        .json({ message: "You have already voted on this post" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const vote = new Vote({
      post_id: postId,
      voter_id: user_id,
      vote: voteType,
    });
    await vote.save();

    if (voteType === "upvote") {
      post.upvotes += 1;
    } else {
      post.downvotes += 1;
    }
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error processing vote" });
  }
};
