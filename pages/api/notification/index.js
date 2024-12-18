import Notification from "@/model/notificationSchema";
import cookies from "next-cookies";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { user_id } = cookies({ req });

    if (!user_id) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Find the post to notify the post owner
    const notifications = await Notification.find({ userId: user_id }).sort({
      created_at: -1,
    });

    res.status(200).json(notifications);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
