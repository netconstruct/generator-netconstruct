var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./tasks');

gulp.task('build', ['build:webpack']);
gulp.task('serve', ['serve:default']);
gulp.task('default', ['serve']);
