import React from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const FloatingActionButton = ({ onClick, showForm }) => {
  return (
    <button
      className="fixed bottom-[30px] right-[30px] bg-background rounded-full p-3 z-2 text-purple border-[3px] border-purple transition duration-200 "
      onClick={onClick}
    >
      {showForm ? <CloseOutlinedIcon /> : <CreateOutlinedIcon />}
      <span
        className="absolute inset-0 rounded-full outline outline-[3px] outline-purple pointer-events-none z-[1]"
        aria-hidden="true"
      ></span>
      <span
        className="absolute inset-0 rounded-full outline outline-[3px] outline-blue -top-[2px] -left-[2px] pointer-events-none z-[-4]"
        aria-hidden="true"
      ></span>
      <span
        className="absolute inset-0 rounded-full outline outline-[4px] outline-pink top-[2px] left-[2px] pointer-events-none z-[-5]"
        aria-hidden="true"
      ></span>
    </button>
  );
};

export default FloatingActionButton;
