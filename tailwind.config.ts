import tailwindForms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type {Config} from "tailwindcss";
import colors from "tailwindcss/colors";
import {fontFamily} from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // To just have on nuance of the gray color
        gray: colors.neutral,
      },
      fontFamily: {
        sans: ["Graphik", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
    },
  },
  plugins: [tailwindForms, typography],
} satisfies Config;
