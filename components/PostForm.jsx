// components/PostForm.js
import postContext from "@/context/postContext";
import toastContext from "@/context/toastContext";
import Cookies from "js-cookie";
import { useContext, useState } from "react";

export default function PostForm({ setShowForm }) {
  const [text, setText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const { posts, setPosts } = useContext(postContext);
  const { errorToast } = useContext(toastContext);

  const handlePostSubmit = async (e) => {
    const user_name = Cookies.get("user_name");
    e.preventDefault();
    if (text.length < 5) {
      errorToast("Post cannot be less than 5 characters");
      return;
    }
    setIsPosting(true);
    const created_at = new Date();
    console.log(created_at);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const _post = {
          created_by: user_name,
          content: text,
          location,
          created_at,
        };
        setShowForm(false);
        setPosts((prevPosts) => [_post, ...prevPosts]);
        const res = await fetch("/api/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(_post),
        });

        const newPost = await res.json();
        console.log(newPost);

        if (res.ok) {
          console.log(posts);
        } else {
          setPosts((prevPosts) => [...prevPosts.slice(1)]);
          errorToast(newPost.message);
        }
        setIsPosting(false);
        setText("");
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 m-0 z-50">
      <form
        onSubmit={handlePostSubmit}
        className="flex flex-col space-y-4 p-4 bg-background rounded-[8px] w-[80%]"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts anonymously..."
          className="p-2 bg-background border-purple rounded-[8px] text-purple resize-none border-[2px]"
          rows={3}
          maxLength={256}
        />
        <button
          type="submit"
          disabled={isPosting}
          className="relative px-[19px] py-[11px] text-light-text rounded-[8px] bg-purple"
        >
          {isPosting ? "posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}
