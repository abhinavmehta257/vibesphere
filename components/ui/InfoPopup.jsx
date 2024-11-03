import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function InfoPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const popupToggle = () => {
    console.log("test");

    setShowPopup(!showPopup);
  };
  return (
    <>
      <InfoOutlinedIcon
        className="text-[32px] text-purple"
        onClick={popupToggle}
      />
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center px-[16px] z-[1000]">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-2xl font-bold mb-2 text-purple">
              Welcome to VibeSphere!
            </h2>

            <p className="mb-4 text-dark-text">
              With our app, you can share your thoughts, questions, or
              experiences without revealing your identity. When you post, others
              nearby can see it, react, and even respond to your message.
            </p>
            <p className="mb-4 text-dark-text">
              You&apos;ll also be able to view posts from people around you,
              making it easy to engage with your local community. Whether
              you&apos;re looking for advice, sharing a funny moment, or just
              expressing yourself, connect with those nearby in a safe,
              anonymous way.
            </p>
            <button
              className="mt-4 bg-purple text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none"
              onClick={popupToggle}
            >
              Let&apos;s Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoPopup;
