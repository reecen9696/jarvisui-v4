import React from "react";
import ChatBox from "../ChatBox";
import GlobeAnimation from "../GlobeAnimation";

const SectionOne: React.FC = () => {
  return (
    <div className="snap-section">
      <div className="flex flex-col justify-end h-full p-4 md:p-8 jusify-center ">
        <GlobeAnimation />
        <div className="w-full mb-28 md:mb-0 md:w-1/3 md:mx-auto">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
