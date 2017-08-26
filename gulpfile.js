var gulp = require('gulp');
var browserSync = require('browser-sync');
var typescript = require('gulp-typescript');
var del = require('del');
var casperJs = require('gulp-casperjs');

gulp.task('default', ['clean', 'copyIndex', 'copyCSS', 'typescript', 'browserSync', 'watch']);

gulp.task('copyIndex', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('copyCSS', function() {
    gulp.src('src/gallery.css')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('typescript', function() {
    return gulp.src('src/**/*.ts')
    .pipe(typescript())
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function() {
    return del.sync('./dist');
});

gulp.task('watch', function () {
    gulp.watch('src/index.html', ['copyIndex']);
    gulp.watch('src/gallery.css', ['copyCSS']);
    gulp.watch('src/**/*.ts', ['typescript']);
});

gulp.task('test', function () {
    gulp.src('test/test.js')
        .pipe(casperJs({
            binPath: './node_modules/casperjs/bin/casperjs'
        }));
});
