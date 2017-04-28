const path = require('path');

// Define root path.
const paths = {
  root: path.resolve(__dirname, '../'),
};

// Define additional paths.
paths.bowerComponents = path.join(paths.root, 'bower_components');
paths.dist = path.join(paths.root, '../dist');
paths.eslintIgnore = path.join(paths.root, '.eslintignore');
paths.fonts = path.join(paths.root, 'fonts');
paths.img = path.join(paths.root, 'img');
paths.js = path.join(paths.root, 'js');
paths.nodeModules = path.join(paths.root, 'node_modules');
paths.offline = path.join(paths.root, './offline.ejs');
paths.sass = path.join(paths.root, 'sass');
paths.sitefiles = path.join(paths.root, '../');
paths.sw = path.join(paths.root, 'js/sw.js');
paths.vendor = path.join(paths.root, 'js/vendor');

module.exports = paths;
