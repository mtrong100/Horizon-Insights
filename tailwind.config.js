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

        /* Dark-theme */
        primaryDark: "#13131A",
        secondaryDark: "#1b1b1d",
        darkGraphite: "#242526",
        darkSaga: "#2f2f2f",

        /* Dark-blue */
        deepBlue: "#15202b",
        blueNavy: "#1e2732",

        /* Text-color */
        text_1: "#171725",
        text_2: "#4B5264",
        text_3: "#808191",
        text_4: "#B2B3BD",

        /* White-theme */
        cloudGray: "#dadde1",
        whiteSoft: "#FCFBFF",
        graySoft: "#FCFCFC",
        cream: "#f3f3f3",

        /* Main-color */
        lavender: "#ba8fff",
        plum: "#593d88",
        saga: "#86d46b",
        sapphirePurple: "#7856ff",
        magentaPink: "#f91880",
        skyBlue: "#1d9bf0",
        goldenYellow: "#ffd400",
        amberOrange: "#e66e00",
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
