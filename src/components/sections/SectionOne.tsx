import React from "react";

const SectionOne: React.FC = () => {
  return (
    <div className="snap-section">
      <div className="flex flex-col items-center justify-center h-full bg-white">
        <div className="max-w-4xl mx-auto md:p-8 p-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            JARVIS
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Your AI trading assistant for cryptocurrency markets
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
