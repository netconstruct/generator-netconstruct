(function () {
  var gulp = require('gulp');
  var gutil = require('gulp-util');
  var webpack = require('webpack');

  var deployOptions = require('./webpack.uat.config');

  module.exports = gulp.task('build:webpack-uat', ['build:modernizr'], function (callback) {
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
})();
