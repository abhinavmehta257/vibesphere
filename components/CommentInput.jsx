import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function CommentInput({ postId, setPost }) {
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
      setIsPosting(true);
      const response = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: "Anonymous", text: comment }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsPosting(false);
        setPost((prevPost) => ({
          ...prevPost,
          comments: (prevPost.comments || 0) + 1, // Increment comment count
        }));
        setComment(""); // Clear the comment input
      } else {
        errorToast(result.message);
      }
      setIsPosting(false);
    }
  };
  return (
    <div className="fixed bottom-0 left-0 w-full bg-dark-background p-4 flex items-center gap-2 border-t border-dark-surface">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 p-2 rounded-lg bg-dark-surface text-light-text"
        rows={1}
      />
      <button
        onClick={handleCommentSubmit}
        className="px-4 py-2 bg-primary text-light-text rounded-lg hover:bg-primary-hover transition border-[1px] border-dark-surface focus:border-light-text focus:border-[1px]"
        disabled={isPosting}
      >
        {isPosting ? "..." : "Post"}
      </button>
      <Toaster />
    </div>
  );
}

export default CommentInput;
