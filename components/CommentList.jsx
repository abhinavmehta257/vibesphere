import React from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

function CommentList({ comments }) {
  return (
    <div className="mt-6">
      <h1 className="text-light-text text-xl">Comments</h1>
      <div className="mt-2 flex flex-col gap-4 h-[400px] overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-dark-surface p-3 rounded-md">
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center rounded-full bg-dark-background text-light-text w-[32px] h-[32px]">
                <PersonOutlinedIcon className="text-[16px]" />
              </div>
              <p className="text-[12px] flex flex-col font-semibold">
                {comment.created_by}{" "}
                <span className="text-[12px] text-subtle-text">
                  {comment.relative_time}
                </span>
              </p>
            </div>
            <p className="text-light-text mt-1 ml-[36px]">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;
