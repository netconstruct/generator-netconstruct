const path = require('path');
const theme = require('@frctl/mandelbrot');

const __root = path.resolve(__dirname, '../../');

module.exports = function setup(fractal, isDevelopmentMode) {
  // Set fractal configuration.
  fractal.set('project.title', 'Styleguide');
  fractal.docs.set('path', path.join(__root, './src/styleguide/docs'));
  fractal.web.set('builder.dest', path.join(__root, './styleguide'));
  fractal.web.set('static.path', path.join(__root, './dist'));
  fractal.web.set('static.mount', 'sitefiles/dist');
  fractal.components.set('path', path.join(__root, './src/styleguide/contents'));
  fractal.components.set('default.preview', '@preview');
  fractal.components.set('default.status', 'prototype');

  const customTheme = theme({
    panels: ['notes', 'html', 'view', 'context', 'resources', 'info'],
  });
  customTheme.addStatic(path.join(__root, 'src/img'), 'src/img');
  fractal.web.theme(customTheme);

  // Create custom handlebars engine to support webpack.
  const hbs = require('@frctl/handlebars')({
    helpers: {
      asset: function asset(fileName) {
        if (isDevelopmentMode) {
          return `/sitefiles/dist/${fileName}`;
        }

        // Get assets.json file from webpack output directory.
        const assetsPath = path.join(__root, './dist/assets.json');
        const assetsJson = require(assetsPath);

        const entry = assetsJson[fileName];

        if (!entry) {
          return '';
        }

        return entry.src;
      },
      icon: function icon(iconName) {
        return `/src/img/icons/symbol/svg/sprite.symbol.svg#${iconName}`;
      },
      json: function json(context) {
        return JSON.stringify(context);
      },
    },
  });

  fractal.components.engine(hbs);
  fractal.docs.engine(hbs);
};
