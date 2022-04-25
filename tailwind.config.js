module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        open: ["Open Sans", "sans-serif"],
        poppins: ["Poppins", "serif"],
      },
    },
  },

  variants: {
    visibility: ["group-hover"],
    inset: ["hover", "focus", "group-hover"],
    transform: ["group-hover", "hover"],
  },

  plugins: [require("@tailwindcss/line-clamp")],
};
