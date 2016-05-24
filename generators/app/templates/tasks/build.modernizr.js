(function() {
  var gulp = require('gulp');
  var modernizr = require('gulp-modernizr');

  module.exports = gulp.task('build:modernizr', [], function() {
    var settings = {
      'options': [
        'addTest',
        'fnBind',
        'html5printshiv',
        'html5shiv',
        'mq',
        'setClasses',
        'testProp',
      ],
      'tests': [
        'csstransforms',
        'csstransforms3d',
        'csstransitions',
      ],
    };

    return gulp.src(['ui/**/*.js', '!ui/js/vendor/**/*.js'])
      .pipe(modernizr('modernizr.custom.js', settings))
      .pipe(gulp.dest('ui/js/vendor'));
  });
})();
