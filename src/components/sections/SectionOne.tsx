import React from "react";
import ChatBox from "../ChatBox";
import GlobeAnimation from "../GlobeAnimation";

const SectionOne: React.FC = () => {
  return (
    <div className="snap-section">
      <div className="relative h-full bg-white p-4 md:p-8">
        {/* Globe centered on full screen */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="aspect-square">
            <GlobeAnimation className="w-full h-full" />
          </div>
        </div>

        {/* ChatBox positioned at bottom */}
        <div className="absolute bottom-24 md:bottom-8 left-4 right-4 md:left-8 md:right-8">
          <div className="w-full md:w-1/3 md:mx-auto">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
