import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2A4D69",
        secondary: "#4B86B4",
        thrid: "#1890FF",
        background: "#E7EFF6",
        "darker-background": "#D1E2EF",
      },
      fontFamily: {
        default: ["Noto Sans Thai", "sans-serif"],
      },
      fontSize: {
        h1: "38px",
        h2: "30px",
        h3: "24px",
        h4: "20px",
        h5: "16px",
        body: "14px",
        description: "12px",
        "h1-mobile": "24px",
        "h2-mobile": "16px",
        "h3-mobile": "12px",
        "h4-mobile": "10px",
        "h5-mobile": "8px",
      },
      screens: {
        mobile: { max: "431px" },
      },
    },
  },

  plugins: [],
};
export default config;
