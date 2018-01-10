/**
 * This task runs browser-sync to serve development assets.
 * This can be run with the following command: gulp serve:default
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');

module.exports = gulp.task('serve:default', [], function () {
  // Initialise webpack bundler.
  var webpackConfig = require('./webpack.hmr.config.js');
  var bundler = webpack(webpackConfig);

  browserSync.create().init({

    middleware: [
      webpackDevMiddleware(bundler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true
        }
      }),
      webpackHotMiddleware(bundler)
    ],

    open: false,
    proxy: 'localhost'
  });
});
