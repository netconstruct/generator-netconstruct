(function () {
  var gulp = require('gulp');
  var gutil = require('gulp-util');
  var webpack = require('webpack');

  var deployOptions = require('./webpack.deploy.config');

  module.exports = gulp.task('build:webpack', ['build:clean'], function (callback) {
    webpack(deployOptions, function (err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      gutil.log('[webpack]', stats.toString());
      callback();
    });
  });
})();
