import React from "react";
import { ReactComponent as Logo } from "../assets/logo/logo.svg";

const BottomNavbar: React.FC = () => {
  return (
    <div className="bg-black text-white py-6 px-6 md:px-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Left side - Copyright text */}
        <div className="text-xs font-mono">
          <p>© 2143 JARVIS TRADING.</p>
          <p>ALL RIGHTS RESERVED.</p>
        </div>

        <div className="flex-shrink-0">
          <Logo className="h-6 w-auto" />
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
