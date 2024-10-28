// components/Post.js
import toastContext from "@/context/toastContext";
import { useContext, useState } from "react";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ContextMenu from "./ContetMenu";

export default function Post({ post }) {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const {errorToast, successToast} = useContext(toastContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent card click when menu is toggled
    setIsMenuOpen(!isMenuOpen);
  };

  const handleReport = async () =>{
    const res = await fetch("/api/post/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: post._id}),
    });
    const response = await res.json()
    if (res.ok) {
      successToast(response.message);
    } else {
        errorToast(response.message);
        console.error("Failed to upvote.");
    }
  }

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
        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex w-full items-center gap-2">
              <div className="p-1 rounded-full bg-dark-background text-light-tet">
                <PersonOutlinedIcon />
              </div>
              <div className="flex justify-between w-full">
                <div>
                  <div className="flex gap-2">
                    <p className="text-[14px]">{post.created_by}</p> 
                    <p className="text-[12px] text-subtle-text">~{post.distance}km</p>    
                  </div>
                  <p className="text-[12px] text-subtle-text">{post.created_at}</p>
                </div>
                <ContextMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} toggleMenu={toggleMenu} repostPost={handleReport}/>
              </div>
            </div>
            <p className="text-light-text">{post.content}</p>
            
          </div>
            
        </div>
        <div className="flex justify-start gap-4 text-[12px] text-subtle-text pb-2">
          <div>
            {post?.comments || "0"} comments
          </div>
        </div>
        <div className="flex justify-start items-center gap-6 text-[12px] text-subtle-text border-t-[1px] border-dark-background pt-2">
          <div className="flex gap-2 items-center">
                <button onClick={handleUpvote} className="flex items-center text-indigo-200">
                  <span className="mr-1"><KeyboardArrowUpOutlinedIcon className="text-[36px]"/></span> 
                </button>
                <p className="text-light-text text-[14px] font-semibold text-center">{upvotes - downvotes}</p>
                <button onClick={handleDownvote} className="flex items-center text-indigo-200">
                  <span className="mr-1"><KeyboardArrowDownOutlinedIcon className="text-[36px]"/></span>
                </button>
            </div>
          <div className="text-indigo-200">
            <ChatBubbleOutlineOutlinedIcon/>
          </div>
        </div>
    </div>
  );
}
