import React from "react";
import ChatBox from "../ChatBox";
import GlobeAnimation from "../GlobeAnimation";
import Lottie from "lottie-react";
import scrollAnimation from "../../assets/lottie/scroll.json";

const SectionOne: React.FC = () => {
  return (
    <div className="snap-section">
      <div className="flex flex-col justify-end h-full p-4 md:p-8 jusify-center ">
        <GlobeAnimation />
        <div className="w-full md:mb-0 md:w-1/3 md:mx-auto">
          <ChatBox />
          <div className="w-8 h-8 mx-auto mt-4">
            <Lottie
              animationData={scrollAnimation}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
