import tailwindForms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type {Config} from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // To just have on nuance of the gray color
        gray: colors.neutral,
      },
    },
  },
  plugins: [tailwindForms, typography],
} satisfies Config;
