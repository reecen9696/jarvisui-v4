import React from "react";
import AgentCard from "../AgentCard";
import StatsGrid from "../StatsGrid";
import TokenPrice from "../TokenPrice";
import PageLayout from "../PageLayout";
import EvolutionProgress from "../EvolutionProgress";
import CullCountdown from "../CullCountdown";

const Bots = [
  {
    id: 1,
    name: "Agent Orange",
    status: "CULLED",
    apr: "32%",
    tradeSuccess: "18%",
    tvl: "$177,399.00",
    age: "3 hours 14 minutes",
  },
  {
    id: 2,
    name: "Agent Blue",
    status: "ACTIVE",
    apr: "25%",
    tradeSuccess: "22%",
    tvl: "$200,000.00",
    age: "1 day 2 hours",
  },
  {
    id: 3,
    name: "Agent Green",
    status: "ACTIVE",
    apr: "25%",
    tradeSuccess: "22%",
    tvl: "$300,000.00",
    age: "1 day 2 hours",
  },
  {
    id: 4,
    name: "Agent Purple",
    status: "CULLED",
    apr: "25%",
    tradeSuccess: "22%",
    tvl: "$150,000.00",
    age: "1 day 2 hours",
  },
  {
    id: 3,
    name: "Agent Green",
    status: "CULLED",
    apr: "25%",
    tradeSuccess: "22%",
    tvl: "$300,000.00",
    age: "1 day 2 hours",
  },
  {
    id: 4,
    name: "Agent Purple",
    status: "CULLED",
    apr: "25%",
    tradeSuccess: "22%",
    tvl: "$150,000.00",
    age: "1 day 2 hours",
  },
  {
    id: 4,
    name: "Agent Purple",
    status: "CULLED",
    apr: "25%",
    tradeSuccess: "22%",
    tvl: "$150,000.00",
    age: "1 day 2 hours",
  },
  {
    id: 3,
    name: "Agent Green",
    status: "CULLED",
    apr: "25%",
    tradeSuccess: "22%",
    tvl: "$300,000.00",
    age: "1 day 2 hours",
  },
  {
    id: 4,
    name: "Agent Purple",
    status: "CULLED",
    apr: "25%",
    tradeSuccess: "22%",
    tvl: "$150,000.00",
    age: "1 day 2 hours",
  },
];

const Stats = [
  { name: "ACTIVE AGENTS", value: "3" },
  { name: "CULLED AGENTS", value: "3" },
  { name: "IQ", value: "43" },
  { name: "ACTIVE AGENTS", value: "3" },
  { name: "24H VOLUME", value: "$91.80" },
  { name: "SUCCESSFUL TRADES", value: "32%" },
  { name: "ACTIVE AGENTS", value: "3" },
  { name: "INDICATORS", value: "MA,RSI,CMF" },
];

const TokenData = { price: "442.03", change: "-0.01%" };

const EvolutionData = {
  currentStage: "Foetus",
  nextStage: "Born",
  progress: 40,
  statusColor: "bg-statuspending",
};

// Set target timestamp for countdown (24 hours from now)
const cullTimestamp = Date.now() + 24 * 60 * 60 * 1000;

const SectionTwo: React.FC = () => {
  return (
    <div className="snap-section md:snap-none">
      <div className="inner-scroll">
        <PageLayout>
          <TokenPrice tokenData={TokenData} />

          <EvolutionProgress
            currentStage={EvolutionData.currentStage}
            nextStage={EvolutionData.nextStage}
            progress={EvolutionData.progress}
            statusColor={EvolutionData.statusColor}
          />

          <StatsGrid stats={Stats} />

          {/* <CullCountdown targetTimestamp={cullTimestamp} /> */}

          <div className=" mt-12 flex flex-row justify-between items-center">
            <p className="text-agent-header">Agents</p>
          </div>

          <AgentCard agents={Bots} />
        </PageLayout>
      </div>
    </div>
  );
};

export default SectionTwo;
