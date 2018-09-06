const autoprefixer = require('autoprefixer');
const pseudoelements = require('postcss-pseudoelements');
const normalize = require('postcss-normalize');
const ie11 = require('postcss-ie11-supports');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['ie 11', 'last 2 versions'],
    }),
    pseudoelements(),
    normalize({ forceImport: true }),
    ie11(),
  ],
};
