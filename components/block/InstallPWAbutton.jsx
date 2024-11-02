import React from "react";

// components/InstallButton.js

import { useState, useEffect } from "react";

const InstallPWAbutton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return deferredPrompt ? (
    <div className="flex w-full flex-row justify-between items-center bg-purple text-background px-[16px] py-[8px] ">
      <p>Take your vibes anywhere! </p>
      <button
        onClick={handleInstallClick}
        className=" pl-3 pr-3 pt-1 pb-1 rounded-[8px] text-background bg-pink"
      >
        Install now
      </button>
    </div>
  ) : null;
};

export default InstallPWAbutton;
