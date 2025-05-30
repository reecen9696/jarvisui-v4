import React, { useState } from "react";
import { ReactComponent as Close } from "../assets/icons/close.svg";
import { ReactComponent as DownIcon } from "../assets/icons/down.svg";
import { ReactComponent as QuestionIcon } from "../assets/icons/question.svg";

interface ExampleSuggestionsProps {
  onClose: () => void;
  onSelectSuggestion: (text: string) => void;
}

const ExampleSuggestions: React.FC<ExampleSuggestionsProps> = ({
  onClose,
  onSelectSuggestion,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    onSelectSuggestion(suggestionText);
    onClose(); // Close suggestions after selection
  };

  return (
    <div className="border border-black p-2 py-4 flex flex-col mb-2">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <QuestionIcon className="w-4 h-4 fill-black mr-2" />
          <p className="text-agent-title">Example suggestions</p>
        </div>
        <button onClick={onClose}>
          <Close className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-row justify-between space-x-2">
        <div
          className={`bg-stat p-2 rounded-lg flex-1 ${
            !isOpen ? "cursor-pointer hover:bg-gray-100" : ""
          }`}
          onClick={!isOpen ? handleToggle : undefined}
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-agent-title">Tokens</p>
            <button onClick={handleToggle}>
              <DownIcon
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {isOpen && (
            <p
              className="text-stat-label leading-tight cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick("Add shitcoins $BONK and $SUI");
              }}
            >
              Try: "Add shitcoins $BONK and $SUI"
            </p>
          )}
        </div>

        <div
          className={`bg-stat p-2 rounded-lg flex-1 ${
            !isOpen ? "cursor-pointer hover:bg-gray-100" : ""
          }`}
          onClick={!isOpen ? handleToggle : undefined}
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-agent-title">Strategy</p>
            <button onClick={handleToggle}>
              <DownIcon
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {isOpen && (
            <p
              className="text-stat-label leading-tight cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick("Start using SRI indicators");
              }}
            >
              Try: "Start using SRI indicators"
            </p>
          )}
        </div>

        <div
          className={`bg-stat p-2 rounded-lg flex-1 ${
            !isOpen ? "cursor-pointer hover:bg-gray-100" : ""
          }`}
          onClick={!isOpen ? handleToggle : undefined}
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-agent-title">Cull</p>
            <button onClick={handleToggle}>
              <DownIcon
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {isOpen && (
            <p
              className="text-stat-label leading-tight cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick("Remove all instances of $DOGE");
              }}
            >
              Try: "Remove all instances of $DOGE"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExampleSuggestions;
