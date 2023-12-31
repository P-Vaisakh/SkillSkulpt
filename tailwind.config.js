export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#062863",
        sub: "#5179fd",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light","dark", "cupcake"],
  },
};
