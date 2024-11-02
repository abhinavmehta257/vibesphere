import React from "react";
function Header({ sortType, setSortType }) {
  return (
    <>
      <div className="fixed top-0 left-0 bg-background w-full px-[16px] py-[28px] pt-6 flex flex-col items-start gap-[16px] z-10">
        <img className="w-[180px]" src="/logo.png" alt="" srcSet="" />
        <div className="flex gap-4">
          <p
            className={`relative border-[3px] border-purple px-[26px] py-1 rounded-[20px] cursor-pointer active-button transition duration-200 ${
              sortType === "new" ? "text-purple" : "text-purple"
            }`}
            onClick={() => setSortType("new")}
          >
            New
            <span
              className={`absolute w-full h-full rounded-[20px] outline outline-[3px] outline-blue transition-all duration-300 ease-in-out pointer-events-none z-[-1] ${
                sortType === "new"
                  ? "-top-[2px] -left-[2px] opacity-100"
                  : "top-0 left-0 opacity-0"
              }`}
              aria-hidden="true"
            ></span>
            <span
              className={`absolute w-full h-full rounded-[20px] outline outline-[3px] outline-pink transition-all duration-300 ease-in-out pointer-events-none z-[-2] ${
                sortType === "new"
                  ? "top-[2px] left-[2px] opacity-100"
                  : "top-0 left-0 opacity-0"
              }`}
              aria-hidden="true"
            ></span>
          </p>
          <p
            className={`relative border-[3px] border-purple px-[26px] py-1 rounded-[20px] cursor-pointer active-button transition duration-200 ${
              sortType === "new" ? "text-purple" : "text-purple"
            }`}
            onClick={() => setSortType("hot")}
          >
            Hot
            <span
              className={`absolute w-full h-full rounded-[20px] outline outline-[3px] outline-blue transition-all duration-300 ease-in-out pointer-events-none z-[-1] ${
                sortType === "hot"
                  ? "-top-[2px] -left-[2px] opacity-100"
                  : "top-0 left-0 opacity-0"
              }`}
              aria-hidden="true"
            ></span>
            <span
              className={`absolute w-full h-full rounded-[20px] outline outline-[3px] outline-pink transition-all duration-300 ease-in-out pointer-events-none z-[-2] ${
                sortType === "hot"
                  ? "top-[2px] left-[2px] opacity-100"
                  : "top-0 left-0 opacity-0"
              }`}
              aria-hidden="true"
            ></span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;
