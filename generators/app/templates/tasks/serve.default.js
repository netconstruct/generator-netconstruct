(function () {
  var gulp = require('gulp');
  var browserSync = require('browser-sync');
  var webpack = require('webpack');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackDevMiddleware = require('webpack-dev-middleware');

  // Initialise webpack bundler.
  var webpackConfig = require('./webpack.dev.config.js');
  var bundler = webpack(webpackConfig);

  module.exports = gulp.task('serve:default', [], function () {
    browserSync.create().init({

      middleware: [
        webpackDevMiddleware(bundler, {
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
})();
