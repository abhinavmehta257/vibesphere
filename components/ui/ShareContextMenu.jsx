import toastContext from "@/context/toastContext";
import ShareIcon from "@mui/icons-material/Share";
import { useContext } from "react";

export default function ShareContextMenu({
  isShareMenuOpen,
  setIsShareMenuOpen,
  ShareToggleMenu,
  post_id,
}) {
  const { successToast } = useContext(toastContext);
  const handleCopyLink = () => {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/post?post_id=${post_id}`;
    navigator.clipboard.writeText(url);
    successToast("Link copied to clipboard!");
  };
  const handleShareVia = () => {
    const url = `/post?post_id=${post_id}`;

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

  return (
    <>
      {isShareMenuOpen ? (
        <div
          className="w-full h-[100dvh] fixed top-0 left-0 z-9"
          onClick={ShareToggleMenu}
        ></div>
      ) : null}
      <div className="relative flex-shrink-0" onClick={ShareToggleMenu}>
        <ShareIcon className="cursor-pointer text-light-text" />
        {/* Share Context Menu */}
        {isShareMenuOpen && (
          <ul
            className="absolute left-0 top-8 bg-white dark:bg-dark-surface shadow-md rounded-lg w-32 z-10 text-light-text"
            onClick={(e) => e.stopPropagation()} // Prevent card click on menu interaction
          >
            <li
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                handleCopyLink(); // Call copy link function
                setIsShareMenuOpen(false); // Close menu after action
              }}
            >
              Copy Link
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                handleShareVia(); // Call share via function
                setIsShareMenuOpen(false); // Close menu after action
              }}
            >
              Share Via
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
