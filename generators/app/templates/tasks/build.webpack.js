/**
 * This task generates the static files for the website.
 * This can be run with the following command: gulp build:webpack-prd
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

module.exports = gulp.task('build:webpack', [], function (callback) {
  var deployOptions = require('./webpack.prd.config');

  webpack(deployOptions, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      assets: true,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      cached: false,
      children: false,
      colors: true,
      modules: false,
      reasons: false,
      source: false
    }));

    callback();
  });
});
