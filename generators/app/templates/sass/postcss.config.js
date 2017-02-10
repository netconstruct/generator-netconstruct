const autoprefixer = require('autoprefixer');
const pseudoelements = require('postcss-pseudoelements');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['ie 11', 'last 2 versions'],
    }),
    pseudoelements(),
  ],
};
