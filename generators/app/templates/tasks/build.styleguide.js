var fractal = require('@frctl/fractal').create();
var gulp = require('gulp');
var gutil = require('gulp-util');

require('../core/fractal.setup')(fractal);

const logger = fractal.cli.console;

module.exports = gulp.task('build:styleguide', ['build:webpack'], function () {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
});
