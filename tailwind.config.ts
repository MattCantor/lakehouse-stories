import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        page: `0 1px 4px rgba(0,0,0,0.27), 0 0 60px rgba(0, 0, 0, 0.1) inset`,
      },
    },
  },
  plugins: [forms, aspectRatio, typography],
} satisfies Config;
