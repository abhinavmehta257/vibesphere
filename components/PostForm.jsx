// components/PostForm.js
import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    setIsPosting(true);
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Pass text and location to the onSubmit function
        
        onSubmit(text, location,setIsPosting);
        setText("");
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 m-0">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-dark-surface shadow rounded-md w-[80%]">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts anonymously..."
                className="p-2 border bg-dark-surface border-dark-background rounded-md resize-none focus:outline-none focus:border-light-surface"
                rows={3}
                maxLength={256}
            />
            <button type="submit" disabled={isPosting} className="bg-dark-background text-white py-2 rounded-md hover:border-light-surface">
                {isPosting ? "posting..." : "Post"}
            </button>
        </form>
    </div>
    
  );
}
