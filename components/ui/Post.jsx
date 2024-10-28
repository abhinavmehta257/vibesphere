// components/Post.js
import toastContext from "@/context/toastContext";
import { useContext, useState } from "react";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

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
    <div className="p-4 bg-dark-surface rounded-md shadow">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-dark-background text-subtle-text">
                <PersonOutlinedIcon />
              </div>
              <div>
                <p className="text-[14px]">{post.created_by}</p>
                <p className="text-[12px] text-subtle-text">{post.created_at}</p>
              </div>
            </div>
            <p className="text-light-text">{post.content}</p>
            
          </div>
            <div className="flex flex-col items-center">
                <button onClick={handleUpvote} className="flex items-center text-indigo-200">
                  <span className="mr-1"><KeyboardArrowUpOutlinedIcon className="text-[36px]"/></span> 
                </button>
                <p className="text-subtle-text">{upvotes - downvotes}</p>
                <button onClick={handleDownvote} className="flex items-center text-indigo-200">
                  <span className="mr-1"><KeyboardArrowDownOutlinedIcon className="text-[36px]"/></span>
                </button>
            </div>
        </div>
      
    </div>
  );
}
