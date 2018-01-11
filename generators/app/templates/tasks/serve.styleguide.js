/**
 * This task runs the fractal styleguide server for development.
 * This can be run with the following command: gulp serve:styleguide
 */

var fractal = require('@frctl/fractal').create();
var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');

module.exports = gulp.task('serve:styleguide', [], function () {
  require('../styleguide/fractal.setup')(fractal, true);
  var __root = path.resolve(__dirname, '../');

  // Initialise webpack bundler.
  var webpackConfig = require('./webpack.hmr.config.js');
  var bundler = webpack(webpackConfig);

  var server = require('../styleguide/fractal.server')(fractal, {
    open: false,
    port: 4000,
    sync: true,
    watch: true,
    syncOptions: {
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true
          }
        }),
        webpackHotMiddleware(bundler)
      ],
    }
  });

  server.start();
});
