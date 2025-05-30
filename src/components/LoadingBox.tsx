import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";

interface LoadingBoxProps {
  onClose?: () => void;
}

const LoadingBox: React.FC<LoadingBoxProps> = ({ onClose }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    "Contacting the server...",
    "Getting a response...",
    "Calculating direction...",
  ];

  // Cycle through loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500); // Change message every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-black p-4 mb-2">
      <div className="flex items-center">
        <div className="w-6 h-6 mr-3">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
        <div className="text-agent-title">
          <p>{loadingMessages[messageIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingBox;
