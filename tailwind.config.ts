import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import theme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        primary: colors.pink,
      },
      fontFamily: {
        sans: ["Inter var", ...theme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
