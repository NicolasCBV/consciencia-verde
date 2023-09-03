const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        "spin": "spin 1s linear infinite",
        "shake": "shake 1s linear infinite",
        'waving-hand': 'wave 2s linear infinite',
      },
      
      fontFamily: {
        bonus: ['Dancing Script'],
      },
      screens: {
        "micro": { "max": "300px" },
        "mini": { "max": "348px" },
        "tablet": "776px",
        "laptop": "1024px",
        "desktop": "1280px",
        "bigDesktop": "1960px" 
      },
      colors: {
        "primaryColor": {
          "50": "#09201D",
          "100": "#12403A",
          "150": "#1B5F56",
          "200": "#1F6F65",
          "250": "#288F83",
          "300": "#2D9F92",
          "350": "#31AFA0",
          "400": "#36BFAF",
          "450": "#40C9B9",
          "500": "#50CEBF",
          "550": "#60D2C5",
          "600": "#70D7CB",
          "650": "#80DBD0",
          "700": "#90E0D6",
          "750": "#A0E4DC",
          "800": "#AFE9E2",
          "850": "#BFEDE8",
          "900": "#CFF2EE",
          "950": "#DFF6F4"
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
