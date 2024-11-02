export default async function createNotification(
  postId,
  userId,
  commentContent
) {
  // Find the post to notify the post owner
  const post = await db.post.findUnique({
    where: { _id: postId }, // Assuming you have a user relationship in your post model
  });

  if (post && post.user_id !== userId) {
    // Create a notification in the database
    await db.notification.create({
      data: {
        userId: post.user_id, // ID of the post owner
        content: `New comment on your post: "${commentContent}"`,
        postId: postId,
      },
    });
  }
}
