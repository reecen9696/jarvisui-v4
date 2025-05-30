import React from "react";
import BottomNavbar from "./BottomNavbar";

interface PageLayoutProps {
  children: React.ReactNode;
  showBottomNavbar?: boolean;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showBottomNavbar = true,
  className = "",
}) => {
  return (
    <div className={`min-h-screen bg-white flex flex-col ${className}`}>
      <div className="flex-1 max-w-4xl mx-auto p-4 md:p-8 mt-20 pb-8">{children}</div>
      {showBottomNavbar && (
        <div className="mt-auto">
          <BottomNavbar />
        </div>
      )}
    </div>
  );
};

export default PageLayout;
