import dbConnect from "@/db/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, postId, commentContent } = req.body;

    if (!userId || !postId || !commentContent) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Find the post to notify the post owner
    const post = await db.post.findUnique({
      where: { id: postId },
      include: { user: true }, // Assuming you have a user relationship in your post model
    });

    if (post && post.userId !== userId) {
      // Create a notification in the database
      await db.notification.create({
        data: {
          userId: post.userId, // ID of the post owner
          content: `New comment on your post: "${commentContent}"`,
          postId: postId,
        },
      });
      res.status(200).json({ message: "Notification sent" });
    } else {
      res.status(404).json({ message: "Post not found or user is the author" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
