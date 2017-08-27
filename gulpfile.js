var gulp = require('gulp');
var browserSync = require('browser-sync');
var typescript = require('gulp-typescript');
var del = require('del');
var casperJs = require('gulp-casperjs');
var browserify = require('browserify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var tslint = require("gulp-tslint");
var sass = require('gulp-sass');

gulp.task('default', ['clean', 'copyIndex', 'copySCSS', 'typescript', 'browserSync', 'watch']);

gulp.task('copyIndex', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('copySCSS', function() {
    return gulp.src('src/gallery.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('typescript', function() {
    browserify('./src/gallery.ts')
        .plugin(tsify)
        .bundle()
        .pipe(source('gallery.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
    return del.sync('./dist');
});

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['copyIndex']);
    gulp.watch('src/gallery.scss', ['copySCSS']);
    gulp.watch('src/**/*.ts', ['typescript']);
});

gulp.task('test', function() {
    gulp.src('test/test.js')
        .pipe(casperJs({
            binPath: './node_modules/casperjs/bin/casperjs'
        }));
});

gulp.task("tslint", function() {
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});
