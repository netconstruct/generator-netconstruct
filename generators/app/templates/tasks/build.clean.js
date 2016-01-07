(function () {
  var del = require('del');
  var gulp = require('gulp');
  var path = require('path');

  var __root = path.resolve(__dirname, '../');

  module.exports = gulp.task('build:clean', [], function (cb) {
    return del(path.join(__root, '../dist'));
  });
})();
