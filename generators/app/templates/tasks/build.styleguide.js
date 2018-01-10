/**
 * This task generates the static files for the styleguide.
 * This can be run with the following command: gulp build:styleguide
 */

var fractal = require('@frctl/fractal').create();
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

module.exports = gulp.task('build:styleguide', [], function (callback) {

  var deployOptions = require('./webpack.prd.config');

  // Create webpack build.
  webpack(deployOptions, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    // Output webpack stats.
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

    // Configure fractal instance using webpack stats.
    require('../styleguide/fractal.setup')(fractal, false);

    // Get references.
    const logger = fractal.cli.console;
    const builder = fractal.web.builder();

    // Ouput progress, error and completion to console.
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));

    return builder.build().then(() => {
      logger.success('Fractal build completed!');
      callback();
    });
  });
});
