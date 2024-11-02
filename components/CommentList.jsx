import React, { useEffect, useRef } from "react";
import CommentCard from "./ui/CommentCard";

function CommentList({ comments }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    // Scrolls to the bottom when comments change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);
  return (
    <div className="mt-[16px] flex flex-col  overflow-y-auto">
      <div ref={bottomRef} />
      {comments.map((comment, index) => (
        <div key={comment._id}>
          {index != 0 ? (
            <div className="w-full border-t-[0.5px] border-light-purple"></div>
          ) : null}
          <CommentCard comment={comment} />
        </div>
      ))}
    </div>
  );
}

export default CommentList;
