// tailwind.config.js
import preline from 'preline/plugin.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    ".pages/**/*.html",
    ".auth/**/*.html",
    "./scripts/**/*.js",
    "./node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [preline],
};
