import React from "react";
import ChatBox from "../ChatBox";

const SectionOne: React.FC = () => {
  return (
    <div className="snap-section">
      <div className="flex flex-col justify-end h-full bg-white p-4 md:p-8">
        <div className="w-full mb-6 md:mb-0 md:w-1/3 md:mx-auto">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
