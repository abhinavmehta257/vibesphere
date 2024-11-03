import Notification from "@/model/notificationSchema";
import cookies from "next-cookies";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { user_id } = cookies({ req });

    if (!user_id) {
      return res.status(400).json({ message: "Invalid request" });
    }

    console.log(user_id);

    // Find the post to notify the post owner
    const notificationsCount = await Notification.countDocuments({
      userId: user_id,
    });

    res.status(200).json({ count: notificationsCount });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
