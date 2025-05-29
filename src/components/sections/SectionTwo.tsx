import React from "react";
import AgentCard from "../AgentCard";
import StatsGrid from "../StatsGrid";
import TokenPrice from "../TokenPrice";
import PageLayout from "../PageLayout";

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
  { name: "24H VOLUME", value: "$91.80" },
  { name: "TOTAL TRADES", value: "1,234" },
  { name: "ACTIVE AGENTS", value: "3" },
  { name: "24H VOLUME", value: "$91.80" },
  { name: "ACTIVE AGENTS", value: "3" },
  { name: "24H VOLUME", value: "$91.80" },
  { name: "TOTAL TRADES", value: "1,234" },
  { name: "ACTIVE AGENTS", value: "3" },
];

const TokenData = { price: "442.03", change: "-0.01%" };

const SectionTwo: React.FC = () => {
  return (
    <div className="snap-section">
      <div className="inner-scroll">
        <PageLayout>
          <TokenPrice tokenData={TokenData} />
          <StatsGrid stats={Stats} />

          <p className="text-agent-header mt-12">Agents</p>
          <AgentCard agents={Bots} />
        </PageLayout>
      </div>
    </div>
  );
};

export default SectionTwo;
