import React from "react";
import SectionOne from "../components/sections/SectionOne";
import SectionTwo from "../components/sections/SectionTwo";

const JarvisPage: React.FC = () => {
  return (
    <div>
      <SectionOne />
      <div className="md:hidden">
        <SectionTwo />
      </div>
    </div>
  );
};

export default JarvisPage;
