module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primarycolor: "#F9A826"
      },
      fontFamily: {
        display: ["Nunito", "sans-serif"]
      },
      height: theme => ({
        "screen/2": "50vh",
        "screen/2+": "60vh",
        "screen/2++": "67.5vh",
        "screen/3": "calc(100vh / 3)",
        "screen/3+": "calc(100vh / 3 + 2vh)",
        "screen/3++": "calc(100vh / 3 + 5vh)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
        "screen3/4": "calc(100vh * 3 / 4)",
        "screen3/4+": "calc(100vh * 3 / 4) + 2vh",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};