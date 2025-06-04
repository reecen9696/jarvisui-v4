import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agents from "./pages/Agents";
import Navbar from "./components/Navbar";
import SectionOne from "./components/sections/SectionOne";
import SectionTwo from "./components/sections/SectionTwo";
import AgentDetail from "./pages/AgentDetail";
import AccountPage from "./pages/AccountPage";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agent/:agentId" element={<AgentDetail />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
