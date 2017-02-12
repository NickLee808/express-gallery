const gulp = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('scss', _ => {
  return gulp.src('./scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('browserSync', _ => {
  browserSync.init(['./public'], {
    server: {
      baseDir: './public'
    }
  });
});

gulp.task('livereload', _ => {
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});

gulp.task('watch', ['browserSync'], _ => {
  gulp.watch('./scss/**/*.scss', ['scss']);
});

gulp.task('default', ['scss', 'watch']);