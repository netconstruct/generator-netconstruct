(function () {
  var gulp = require('gulp');
  var svgSprite = require('gulp-svg-sprite');

  // More complex configuration example
  config = {

  	mode: {
  		inline: true, // Prepare for inline embedding
  		symbol: true // Create a «symbol» sprite
  	}
  };

  module.exports = gulp.task('svgsprite', [], function () {
    gulp.src('**/*.svg', {cwd: 'img/svg'})
    .pipe(svgSprite(config))
    .pipe(gulp.dest('img/icons'));
  });
})();
