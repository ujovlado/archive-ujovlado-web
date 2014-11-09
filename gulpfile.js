var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var inlineSource = require('gulp-inline-source');
var connect = require('gulp-connect');
var del = require('del');

gulp.task('clean', function (cb) {
  del(['build'], cb);
});

gulp.task('vendor', ['clean'], function () {
  gulp.src([
    'vendor/fontawesome/fonts/*.*'
  ])
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('images', ['clean'], function () {
  gulp.src('img/*')
    .pipe(gulp.dest('./build/img'));
});

gulp.task('index', ['clean'], function () {
  gulp.src('index.html')
    .pipe(inlineSource())
    .pipe(minifyHtml())
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
  gulp.watch(['img/*', 'index.html', 'styles.css'], ['vendor', 'images', 'index']);
});

gulp.task('server', function () {
  connect.server({
    port: 8013,
    root: 'build',
    livereload: true
  });
});

gulp.task('default', ['watch', 'vendor', 'images', 'index', 'server'], function () {

});