import React, { useEffect, useState } from "react";

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("hasSeenPopup", "true"); // Mark as seen
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center px-[16px] z-[1000]">
        <div className="bg-dark-background p-6 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2 text-light-text">
            Welcome to VibeSphere!
          </h2>
          <p className="text-light-text mb-4">
            Connect with others around you, share your vibe, and feel the
            community spirit anonymously! 🌍
          </p>
          <p className="text-light-text mb-4">
            Please allow location permissions to see vibes near you and help us
            create a great experience for everyone.
          </p>
          <p className="text-light-text mb-4">
            Remember, be kind, respectful, and keep our community positive and
            safe. 💙 Your identity is always protected!
          </p>
          <button
            className="mt-4 bg-dark-surface text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none"
            onClick={handleClosePopup}
          >
            Let&apos;s Get Started
          </button>
        </div>
      </div>
    )
  );
};

export default WelcomePopup;
