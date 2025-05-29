/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["DM Mono", "monospace"],
        haffer: ["Haffer", "sans-serif"],
        fira: ["FiraCode", "monospace"],
      },
      colors: {
        default: "#0E1013",
        border: "#DBDDE1",
        statuspending: "#D1EFD1",
        statusterminated: "#FEA69E",
        culled: "#F8D7DA",
        active: "#D1EFD1",
        waiting: "#D1EFD1",
        stat: "#F8F9FA",
      },
      fontSize: {
        nav: ["12px", { fontFamily: "FiraCode", fontWeight: "400" }],
        "token-price-header": [
          "48px",
          { fontFamily: "DM Mono", fontWeight: "400" },
        ],
        "token-price-header": [
          "12px",
          { fontFamily: "DM Mono", fontWeight: "400" },
        ],

        "token-price": ["48px", { fontFamily: "Haffer", fontWeight: "200" }],
        "agent-header": ["16px", { fontFamily: "Haffer", fontWeight: "400" }],
        "account-balance": [
          "24px",
          { fontFamily: "Haffer", fontWeight: "400" },
        ],
        "agent-title": ["14px", { fontFamily: "Haffer", fontWeight: "400" }],
        "stat-label": ["10px", { fontFamily: "DM Mono", fontWeight: "400" }],
        "stat-value": ["16px", { fontFamily: "DM Mono", fontWeight: "400" }],
        "status-inactive": [
          "10px",
          { fontFamily: "DM Mono", fontWeight: "500" },
        ],
        "agent-stat-title": [
          "14px",
          { fontFamily: "DM Mono", fontWeight: "400" },
        ],
        "agent-stat-value": [
          "22px",
          { fontFamily: "DM Mono", fontWeight: "400" },
        ],
      },
      borderRadius: {
        stats: "2px",
      },
    },
  },
  plugins: [],
};
