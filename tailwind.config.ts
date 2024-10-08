import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        progressBar: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        progressBar: "progressBar 3s linear infinite",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        righteous: ["Righteous", "sans-serif"],
      },
      fontSize: {
        "32": "2rem",
      },
      padding: {
        "25": "6.25rem",
        ten: "0.625rem",
        "27": "1.688rem",
        "18": "1.125rem",
      },
      gap: {
        fourtheen: "0.875rem",
        "42": "2.625rem",
        six: "0.375rem",
      },
      colors: {
        "primary-0": "#FFFFFF",
        "primary-50": "#F5FAF3",
        "primary-100": "#E6F4D3",
        "primary-200": "#CEEAAC",
        "primary-300": "#AFDB7B",
        "primary-400": "#91C952",
        "primary-500": "#72AE34",
        "primary-600": "#578B25",
        "primary-700": "#446A21",
        "primary-800": "#38551F",
        "primary-900": "#344D20",
        "divider-300": "#E9E9E9",
        "divider-400": "#E4E4E4",
        "divider-500": "#979797",
        "accent-base-400": "#C61414",
      },
      width: {
        "65": "18.375rem",
        "83": "5.188rem",
        "192": "12rem",
      },
      height: {
        "192": "12rem",
      },
      borderRadius: {
        "10": "0.625rem",
      },
      margin: {
        "65": "4.063rem",
        "162": "10.125rem",
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  // plugins: [require("daisyui")],
  darkMode: "class",
  plugins: [nextui(), require("daisyui")],
};
export default config;
