import React from "react";
import { ReactComponent as Code } from "../assets/icons/code.svg";
import { ReactComponent as Close } from "../assets/icons/close.svg";

interface ResponseData {
  id?: string;
  message: string;
  timestamp?: string;
  type?: string;
}

interface ResponseBoxProps {
  response: ResponseData;
  onClose: () => void;
}

const ResponseBox: React.FC<ResponseBoxProps> = ({ response, onClose }) => {
  return (
    <div className="border border-black p-4 mb-2">
      <div className="flex justify-between items-start">
        <div className="flex flex-row items-center mb-3">
          <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
            <Code className="w-2 h-2" />
          </div>
          <p className="text-stat-label ml-2">AI RESPONSE</p>
        </div>
        <button onClick={onClose}>
          <Close className="w-4 h-4" />
        </button>
      </div>

      <div className="text-agent-title">
        <p>{response.message}</p>
      </div>
    </div>
  );
};

export default ResponseBox;
