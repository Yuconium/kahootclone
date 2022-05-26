module.exports = {
  eslint: null,
  style: {
    postOptions: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}