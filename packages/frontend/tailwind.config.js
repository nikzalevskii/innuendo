module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff", // ← Очень светлый синий
          100: "#dbeafe", // ← Светлый синий
          500: "#3b82f6", // ← Основной синий
          600: "#2563eb", // ← Тёмный синий
          700: "#1d4ed8", // ← Очень тёмный синий
          900: "#1e3a8a", // ← Почти чёрный синий
        },
        note: {
          bg: "#fefefe",
          border: "#e5e7eb",
          hover: "#f9fafb",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      animation: {
        "fade-in": "fadeIn 0.2s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // ← Красивые формы
  ],
};
