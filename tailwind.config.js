/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    screens: {
      'xs': '440px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {
      fontFamily: {
        "Shabnam-Regular": "Shabnam Regular",
        "Shabnam-Bold": "Shabnam Bold",
        "Shabnam-Medium": "Shabnam Medium",
        "Shabnam-Light": "Shabnam Light",
        "IRANSans": "IRANSans",
        "Brush": "Brush Script Mt",
        "IRANSans-Bold": "IRANSans Bold",
        "IRANSans-Light": "IRANSans Light",
        "IRANSans-Medium": "IRANSans Medium"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "0.625rem"
        }
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}

