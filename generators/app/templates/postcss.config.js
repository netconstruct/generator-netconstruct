const autoprefixer = require('autoprefixer');
const pseudoelements = require('postcss-pseudoelements');
const normalize = require('postcss-normalize');
const ie11 = require('postcss-ie11-supports');
const flexbugs = require('postcss-flexbugs-fixes');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    autoprefixer(), // Use the browserslist from package.json
    pseudoelements(),
    normalize({ forceImport: false }),
    ie11(),
    flexbugs(),
    pxtorem({
      propList: [
        '*',
        '!letter-spacing',
        '!border*',
        '!text-indent',
      ],
      mediaQuery: true,
    }),
  ],
};
