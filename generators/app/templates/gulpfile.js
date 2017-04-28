var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./tasks');

gulp.task('build-dev', ['build:webpack-dev']);
gulp.task('build-uat', ['build:webpack-uat']);
gulp.task('build-prd', ['build:webpack-prd']);
gulp.task('styleguide', ['serve:styleguide']);
gulp.task('serve', ['serve:default']);
gulp.task('default', ['serve']);
