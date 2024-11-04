import toastContext from "@/context/toastContext";
import getRelativeTime from "@/utils/getRelativeTime";
import ShareIcon from "@mui/icons-material/Share";
import { useContext } from "react";

export default function ShareContextMenu({
  isShareMenuOpen,
  setIsShareMenuOpen,
  ShareToggleMenu,
  post,
}) {
  const { successToast } = useContext(toastContext);
  const handleCopyLink = () => {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post._id}`;
    navigator.clipboard.writeText(url);
    successToast("Link copied to clipboard!");
  };
  const handleShareVia = () => {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post._id}`;

    const shareData = {
      title: "Check out this anonymous post!",
      text: "Here's a great post I found!",
      url: url, // Use the current URL of the page
    };

    // Check if the Web Share API is supported
    if (navigator.share) {
      navigator.share(shareData).catch((error) => {
        console.error("Error sharing:", error);
        alert("Error sharing the post. Please try again.");
      });
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert(
        "Sharing not supported on this browser. Please copy the link manually."
      );
    }
  };
  async function shareToInstagramStory() {
    // Make sure Instagram is installed on the user's device
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    const imageUrl = `${url}/api/og?content=${encodeURIComponent(
      post.content
    )}&created_by=${encodeURIComponent(post.created_by)}&distance=${
      post.distance || "0"
    }&time_ago=${
      encodeURIComponent(getRelativeTime(post.created_at)) || "0 min"
    }&score=${post.score || "0"}&comments=${post.comments || "0"}`;

    console.log(imageUrl);

    if (navigator.share) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "image.png", { type: "image/png" });

        await navigator.share({
          files: [file],
          title: "Share to Instagram Story",
          text: "Check out this story!",
        });
      } catch (error) {
        console.error("Error sharing image:", error);
      }
    } else {
      alert("Instagram is not available on this device.");
    }
  }

  return (
    <>
      {isShareMenuOpen ? (
        <div
          className="w-full h-[100dvh] fixed top-0 left-0 z-9"
          onClick={ShareToggleMenu}
        ></div>
      ) : null}
      <ShareIcon
        className="cursor-pointer text-light-purple"
        onClick={ShareToggleMenu}
      />

      <div className="relative flex-shrink-0">
        {/* Share Context Menu */}
        {isShareMenuOpen && (
          <ul
            className="absolute -left-6 top-2 bg-white dark:bg-background text-purple shadow-md rounded-lg w-32 z-10 text-light-text"
            onClick={(e) => e.stopPropagation()} // Prevent card click on menu interaction
          >
            <li
              className="px-4 py-2 rounded-lg hover:bg-light-purple cursor-pointer font-semibold"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                handleCopyLink(); // Call copy link function
                setIsShareMenuOpen(false); // Close menu after action
              }}
            >
              Copy Link
            </li>
            <li
              className="px-4 py-2 rounded-lg hover:bg-light-purple cursor-pointer font-semibold"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                handleShareVia(); // Call share via function
                setIsShareMenuOpen(false); // Close menu after action
              }}
            >
              Share Via
            </li>
            <li
              className="px-4 py-2 rounded-lg hover:bg-light-purple cursor-pointer font-semibold"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                shareToInstagramStory(); // Call share via function
                setIsShareMenuOpen(false); // Close menu after action
              }}
            >
              Share on Insta
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
