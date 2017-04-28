var path = require('path');
var theme = require('@frctl/mandelbrot');

var __root = path.resolve(__dirname, '../../');

module.exports = function setup(fractal) {
  fractal.set('project.title', 'Styleguide');
  fractal.docs.set('path', path.join(__root, './src/docs'));
  fractal.web.set('builder.dest', path.join(__root, './styleguide'));
  fractal.web.set('static.path', path.join(__root, './dist'));
  fractal.web.set('static.mount', 'sitefiles/dist');
  fractal.components.set('path', path.join(__root, './src/sass'));
  fractal.components.set('default.preview', '@preview');

  const customTheme = theme({});
  customTheme.addStatic(path.join(__root, 'src/img'), 'src/img');
  fractal.web.theme(customTheme);
}
