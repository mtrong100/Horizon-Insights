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
        primaryGradient: "linear-gradient(to right , #5b86e5, #36d1dc)",
        secondaryGradient: "linear-gradient(to right , #1d9bf0, #7856ff)",
      },
    },
  },
  plugins: [],
};
