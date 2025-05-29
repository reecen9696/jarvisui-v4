import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SectionOne from "./components/sections/SectionOne";
import SectionTwo from "./components/sections/SectionTwo";
import Navbar from "./components/Navbar";
import AgentDetail from "./pages/AgentDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Agent Detail Route */}
          <Route
            path="/:agentId"
            element={
              <>
                <Navbar />
                <AgentDetail />
              </>
            }
          />

          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <div className="scroll-container">
                  <SectionOne />
                  <SectionTwo />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
