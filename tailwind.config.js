/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poppins",
    },
    extend: {
      colors: {
        mainBackground: "rgb(var(--main-background))",
        textColor: "rgb(var(--text-color))",
        activeColor: "rgb(var(--active-color))",
        borderColor: "rgb(var(--border-color))",
        forcegroundColor: "rgb(var(--main-forceground))",
        hoverForeground: "rgba(var(--hover-forceground), 0.3)",
        secondaryColor: "rgba(var(--secondary-color))",
        buttonColor: "rgba(var(--button-color))",
        buttonText: "rgba(var(--button-text))",
        colorGray: "rgba(var(--color-gray))",

        plum: "#593d88",
        sapphirePurple: "#7856ff",
        magentaPink: "#f91880",
        skyBlue: "#1d9bf0",
        mintGreen: "#00ba7c",
      },
      backgroundImage: {
        /* GRADIENT-COLOR */
        cyanLinear: "linear-gradient(to right , #1d9bf0, #7856ff)",
        featureLinear: "linear-gradient(to right , #00ba7c, #20E3B2)",
        hotLinear: "linear-gradient(to right , #f91880, #f54d5e)",
      },
    },
  },
  plugins: [],
};
