import React from "react";
import { ReactComponent as Close } from "../assets/icons/close.svg";

interface ExampleSuggestionsProps {
  onClose: () => void;
}

const ExampleSuggestions: React.FC<ExampleSuggestionsProps> = ({ onClose }) => {
  return (
    <div className="border border-black p-2 py-4 flex flex-col mb-2">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-black rounded-full mr-2"></div>
          <p className="text-agent-title">Example suggestions</p>
        </div>
        <button onClick={onClose}>
          <Close className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-row justify-between space-x-2">
        <div className="bg-stat p-2 rounded-lg">
          <p className="text-agent-title">Tokens</p>
          <p className="text-stat-label">Try: "Add shitcoins $BONK and $SUI"</p>
        </div>
        <div className="bg-stat p-2 rounded-lg">
          <p className="text-agent-title">Strategy</p>
          <p className="text-stat-label">Try: "Start using SRI indicators"</p>
        </div>
        <div className="bg-stat p-2 rounded-lg">
          <p className="text-agent-title">Cull</p>
          <p className="text-stat-label">
            Try: "Remove all instances of $DOGE"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExampleSuggestions;
