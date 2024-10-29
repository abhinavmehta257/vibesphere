import React from "react";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";

function NoData({ text }) {
  return (
    <div className="flex flex-col mt-auto mb-auto justify-center items-center text-subtle-text">
      <FeedbackOutlinedIcon className="text-[64px]" />
      <p className="text-center mt-4">{text}</p>
    </div>
  );
}

export default NoData;
