import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SectionOne from "./components/sections/SectionOne";
import SectionTwo from "./components/sections/SectionTwo";
import Navbar from "./components/Navbar";
import AgentDetail from "./pages/AgentDetail";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
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

            <Route
              path="/account"
              element={
                <>
                  <Navbar />
                  <AccountPage />
                </>
              }
            />

            <Route
              path="/:agentId"
              element={
                <>
                  <Navbar />
                  <AgentDetail />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
