var fractal = require('@frctl/fractal').create();
var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');

require('../core/fractal.setup')(fractal);

var __root = path.resolve(__dirname, '../');

// Initialise webpack bundler.
var webpackConfig = require('./webpack.hmr.config.js');

module.exports = gulp.task('serve:styleguide', [/* 'build:modernizr' */], function () {
  var bundler = webpack(webpackConfig);

  var server = require('../core/fractal.server')(fractal, {
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
