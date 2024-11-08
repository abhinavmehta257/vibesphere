import React from "react";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";

function NoData({ text }) {
  return (
    <div className="flex flex-col mt-auto mb-auto m-[16px] justify-center items-center text-light-purple">
      <FeedbackOutlinedIcon className="text-[64px]" />
      <p className="text-center mt-4">{text}</p>
    </div>
  );
}

export default NoData;
