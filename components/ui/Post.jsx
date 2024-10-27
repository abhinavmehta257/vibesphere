// components/Post.js
import toastContext from "@/context/toastContext";
import { useContext, useState } from "react";

export default function Post({ post }) {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const {errorToast} = useContext(toastContext);
  const handleUpvote = async () => {
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post._id, voteType: 'upvote' }),
    });
    const response = await res.json()
    if (res.ok) {
      setUpvotes((prev) => prev + 1);
    } else {
        errorToast(response.message);
        console.error("Failed to upvote.");
    }
  };
  
  const handleDownvote = async () => {
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post._id, voteType: 'downvote' }),
    });
    const response = await res.json()
    
    if (res.ok) {
      setDownvotes((prev) => prev + 1);
    } else {
      errorToast(response.message);
      console.error("Failed to downvote.");
    }
  };
  

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow">
        <div className="flex justify-between gap-4">
            <p className="text-gray-700">{post.content}</p>
            <div className="flex flex-col items-center">
                <button onClick={handleUpvote} className="flex items-center text-green-600">
                <span className="mr-1">⬆️</span> 
                </button>
                    <p className="text-indigo-600">{upvotes - downvotes}</p>
                <button onClick={handleDownvote} className="flex items-center text-red-600">
                <span className="mr-1">⬇️</span>
                </button>
            </div>
        </div>
      
    </div>
  );
}
