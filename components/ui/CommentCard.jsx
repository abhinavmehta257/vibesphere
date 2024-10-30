import React from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import getRelativeTime from "@/utils/getRelativeTime";

function CommentCard({ comment }) {
  const { created_at } = comment;
  const relative_time = getRelativeTime(created_at);
  return (
    <div className="bg-dark-surface p-3 rounded-md">
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center rounded-full bg-dark-background text-light-text w-[32px] h-[32px]">
          <PersonOutlinedIcon className="text-[16px]" />
        </div>
        <p className="text-[12px] flex flex-col font-semibold">
          {comment.created_by}{" "}
          <span className="text-[12px] text-subtle-text">{relative_time}</span>
        </p>
      </div>
      <p className="text-light-text mt-1 ml-[36px]">{comment.text}</p>
    </div>
  );
}

export default CommentCard;
