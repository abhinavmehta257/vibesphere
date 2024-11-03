import { useState, useEffect } from "react";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import Link from "next/link";

function Notification() {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const res = await fetch("/api/notification/count");
        const data = await res.json();
        setCount(data.count || 0); // Adjust based on your response structure
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notification"); // Assuming you have an endpoint for notifications
        const data = await res.json();
        console.log(data);

        setNotifications(data || []); // Adjust based on your response structure
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotificationCount();
    fetchNotifications();
  }, []);

  const toggleNotification = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      {showPopup ? (
        <div
          className="w-full h-[100dvh] fixed top-0 left-0 z-9"
          onClick={toggleNotification}
        ></div>
      ) : null}
      <div className="relative p-1" onClick={toggleNotification}>
        <NotificationsActiveOutlinedIcon className="text-purple text-[32px] cursor-pointer" />
        {count > 0 && (
          <div className="absolute top-0 right-0 flex justify-center items-center bg-blue text-background rounded-full w-5 h-5">
            {count}
          </div>
        )}
        {showPopup && (
          <div className="absolute right-0 mt-2 w-64 bg-background shadow-lg rounded-lg p-2 z-10 max-h-[60dvh]">
            <h4 className="font-semibold text-lg text-purple">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-dark-text">No notifications</p>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="p-2 border-b last:border-b-0 border-light-purple"
                >
                  <div
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/post?post_id=${notification.postId}`}
                  >
                    <p className="text-sm text-dark-text">
                      {notification.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notification.created_at}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Notification;
