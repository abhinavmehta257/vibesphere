// components/PostForm.js
import postContext from "@/context/postContext";
import toastContext from "@/context/toastContext";
import generateAnonymousName from "@/utils/generateAnonymousName";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import ExpandableGifSearch from "./block/ExpandableGifSearch";

export default function PostForm({ setShowForm }) {
  const [text, setText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [selectedGif, setSelectedGif] = useState(null);
  const { posts, setPosts } = useContext(postContext);
  const { errorToast } = useContext(toastContext);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    let created_by = Cookies.get("user_name");
    if (!created_by) {
      created_by = generateAnonymousName();
      Cookies.set("user_name", created_by);
    }

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
          created_by,
          content: text,
          gifUrl: selectedGif, // Include the selected GIF URL
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
        setSelectedGif(null);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 m-0 z-8">
      <form
        onSubmit={handlePostSubmit}
        className="flex flex-col space-y-4 p-4 bg-background rounded-[8px] w-[80%]"
      >
        <div className="w-full  p-2 border-purple rounded-[8px] text-purple resize-none border-[2px]">
          <div className="flex h-[100px]">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts anonymously..."
              className="bg-background w-full border border-none focus:border-none"
              rows={3}
              maxLength={256}
            />
            <img src={selectedGif} />
          </div>
          <GifBoxOutlinedIcon
            className="mr-2 text-[24px] ml-auto"
            onClick={() => setShowGifPicker(!showGifPicker)}
          />
          {showGifPicker && (
            <ExpandableGifSearch
              setSelectedGif={setSelectedGif}
              setShowGifPicker={setShowGifPicker}
            />
          )}
        </div>

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
