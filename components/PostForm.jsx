// components/PostForm.js
import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Pass text and location to the onSubmit function
        onSubmit(text, location);
        setText("");
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 m-0">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-white shadow rounded-md w-[80%]">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts anonymously..."
                className="p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-indigo-500"
                rows={3}
                maxLength={256}
            />
            <button type="submit" className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
                Post
            </button>
        </form>
    </div>
    
  );
}
