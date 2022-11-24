/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl":
          "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
      },
      minWidth: {
        225: "225px",
      },
      colors: {
        alfa: "#E868FA",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      screens: {
        tablet: "280px",
      },
    },
  },
  plugins: [],
};
