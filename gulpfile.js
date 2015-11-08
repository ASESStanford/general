var gulp = require('gulp'),
    sass = require('gulp-sass'),
    riot = require('gulp-riot'),
    rev = require('gulp-rev'),
    livereload = require('gulp-livereload');
    browserSync = require('browser-sync').create();
    app = 'app/';
    flask = '../app/web/';

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });
});

gulp.task('scripts', function() {
  gulp.src([app + 'scripts/**/*.js', app + 'scripts/*.js'])
    .pipe(gulp.dest('dist/js'))
	browserSync.reload();
});

gulp.task('fonts', function() {
  gulp.src([app + 'fonts/**/*.*', app + 'scripts/*.*'])
    .pipe(gulp.dest('dist/fonts'))
	browserSync.reload();
});

gulp.task('images', function() {
  gulp.src([app + 'images/**/*.*', app + 'scripts/*.*'])
    .pipe(gulp.dest('dist/images'))
	browserSync.reload();
});

gulp.task('sass', function() {
  gulp.src(app + 'styles/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest(app + 'css'))
    .pipe(livereload());
});

gulp.task('html', function() {
  gulp.src(app + 'index.html')
    .pipe(gulp.dest('dist'))
	browserSync.reload();
});

gulp.task('default', ['sass', 'browser-sync', 'fonts', 'html', 'scripts', 'images'], function() {
  livereload.listen();
  gulp.watch(app + 'styles/**/*.scss', ['sass']);
  gulp.watch(app + 'scripts/**/*.js', ['scripts']);
  gulp.watch(app + 'fonts/**/*.*', ['fonts']);
  gulp.watch(app + 'images/**/*.*', ['images']);
  gulp.watch(app + 'index.html', ['html']);
});
