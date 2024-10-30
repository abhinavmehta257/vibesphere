import React, { useEffect, useRef } from "react";
import CommentCard from "./ui/CommentCard";

function CommentList({ comments }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    // Scrolls to the bottom when comments change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);
  return (
    <div className="mt-6">
      <h1 className="text-light-text text-xl">Comments</h1>
      <div className="mt-2 flex flex-col gap-4 h-[60dvh] overflow-y-auto">
        {comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default CommentList;
