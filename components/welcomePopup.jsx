import toastContext from "@/context/toastContext";
import checkLocationPermission from "@/utils/checkLocationPermission";
import React, { useContext, useEffect, useState } from "react";

const WelcomePopup = ({ setIsLocation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { errorToast } = useContext(toastContext);
  useEffect(() => {
    const checkPermissionAndPopup = async () => {
      // Check if the user has already seen the popup
      const isLocation = await checkLocationPermission();

      const hasSeenPopup = localStorage.getItem("hasSeenPopup");
      console.log("hasSeenPopup", hasSeenPopup);

      if (hasSeenPopup == null) {
        setShowPopup(true);
      } else {
        if (isLocation) {
          setIsLocation(isLocation);
        }
      }
      if (!isLocation) {
        setShowPopup(true);
      }
    };

    checkPermissionAndPopup();
  }, []);

  const handleClosePopup = async () => {
    const isLocation = await checkLocationPermission(errorToast);
    console.log(isLocation);

    if (isLocation) {
      setShowPopup(false);
      setIsLocation(true);
    } else {
      errorToast("Location permission is required for this app to work.");
    }
    localStorage.setItem("hasSeenPopup", "true"); // Mark as seen
  };

  return (
    showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center px-[16px] z-[1000]">
        <div className="bg-background p-6 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2 text-purple">
            Welcome to VibeSphere!
          </h2>
          <p className="text-dark-text mb-4">
            Connect with others around you, share your vibe, and feel the
            community spirit anonymously! 🌍
          </p>
          <p className="text-dark-text mb-4">
            Please allow location permissions to see vibes near you and help us
            create a great experience for everyone.
          </p>
          <p className="text-dark-text mb-4">
            Remember, be kind, respectful, and keep our community positive and
            safe. 💙 Your identity is always protected!
          </p>
          <p className="text-red-400 text-[12px]">
            **Location permission is necessary for this app to work
          </p>
          <button
            className="mt-4 bg-purple text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none"
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
