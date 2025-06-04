import React, { useRef, useEffect } from "react";
import ChatBox from "../ChatBox";
import GlobeWrapper from "../GlobeWrapper";
import Lottie from "lottie-react";
import scrollAnimation from "../../assets/lottie/scroll.json";

const SectionOne: React.FC = () => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5); // Slow down to 50% speed
    }
  }, []);

  return (
    <div className="md:h-screen snap-section">
      <div className="relative flex flex-col justify-end h-full p-4 md:p-0 ">
        {/* Background GlobeAnimation */}
        <div className="absolute inset-0 flex items-center justify-center ">
          <GlobeWrapper />
        </div>

        {/* Foreground content */}
        <div className="relative z-10 w-full md:w-1/3 md:mx-auto md:mb-8">
          <ChatBox />
          <div className="md:hidden text-stat-label flex justify-center items-center flex-col mt-4">
            <p>SWIPE</p>
            <div className="w-10 h-10 ">
              <Lottie
                lottieRef={lottieRef}
                animationData={scrollAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
