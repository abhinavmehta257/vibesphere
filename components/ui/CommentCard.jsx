import React from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import getRelativeTime from "@/utils/getRelativeTime";

function CommentCard({ comment }) {
  const { created_at } = comment;
  const relative_time = getRelativeTime(created_at);
  return (
    <div className="bg-background p-3 ">
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center rounded-full bg-purple text-background w-[32px] h-[32px]">
          <PersonOutlinedIcon className="text-[24px]" />
        </div>
        <p className="text-[12px] flex flex-col font-semibold text-dark-text">
          {comment.created_by}{" "}
          <span className="text-[12px] text-purple">{relative_time}</span>
        </p>
      </div>
      <p className="text-light-text mt-1 ml-[36px] text-dark-text">
        {comment.text}
      </p>
    </div>
  );
}

export default CommentCard;
