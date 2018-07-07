const gulp = require('gulp');
const serve = require('gulp-serve');

gulp.task('serve', serve({
  root: ['src'],
  port: 8080,
}));
