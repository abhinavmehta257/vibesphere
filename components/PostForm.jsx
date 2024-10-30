// components/PostForm.js
import postContext from "@/context/postContext";
import toastContext from "@/context/toastContext";
import generateAnonymousName from "@/utils/generateAnonymousName";
import { useContext, useState } from "react";

export default function PostForm({ setShowForm }) {
  const [text, setText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const { posts, setPosts } = useContext(postContext);
  const { errorToast } = useContext(toastContext);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
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
          created_by: generateAnonymousName(),
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
        className="flex flex-col space-y-4 p-4 bg-dark-surface shadow rounded-md w-[80%]"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts anonymously..."
          className="p-2 border bg-dark-surface border-dark-background rounded-md resize-none focus:outline-none focus:border-light-surface"
          rows={3}
          maxLength={256}
        />
        <button
          type="submit"
          disabled={isPosting}
          className="bg-dark-background text-white py-2 rounded-md hover:border-light-surface"
        >
          {isPosting ? "posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}
