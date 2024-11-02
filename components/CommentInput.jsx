import generateAnonymousName from "@/utils/generateAnonymousName";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function CommentInput({ postId, setPost, setComments }) {
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const errorToast = (message) => {
    toast.error(message, {
      duration: 2000, // duration in milliseconds
      position: "bottom-center", // position of the toast
    });
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      const created_by = generateAnonymousName();
      const created_at = new Date();
      const _comment = {
        created_by,
        user: "Anonymous",
        text: comment,
        created_at,
      };

      setComment(""); // Clear the comment input
      setPost((prevPost) => ({
        ...prevPost,
        comments: (prevPost.comments || 0) + 1, // Increment comment count
      }));
      setComments((prevComments) => [_comment, ...prevComments]);
      const response = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_comment),
      });
      const result = await response.json();
      if (!response.ok) {
        setComments((prevComments) => prevComments.slice(0, -1));
        errorToast(result.message);
      }
    }
  };
  return (
    <div className="fixed bg-background bottom-0 left-0 w-full bg-dark-background p-4 flex items-center gap-2">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 p-2 rounded-lg bg-background text-purple border-[2px] border-purple"
        rows={1}
      />
      <button
        onClick={handleCommentSubmit}
        className="relative px-[16px] py-[8px] bg-primary text-light-text rounded-[8px] bg-purple text-background"
      >
        Post
      </button>
      <Toaster />
    </div>
  );
}

export default CommentInput;
