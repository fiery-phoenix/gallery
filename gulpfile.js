var gulp = require('gulp');
var browserSync = require('browser-sync');
var typescript = require('gulp-typescript');
var del = require('del');

gulp.task('default', ['clean', 'copySource', 'typescript', 'browserSync', 'watch']);

gulp.task('copySource', function()  {
    console.log('Start');

    gulp.src('src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream: true}));

    console.log('Finish');
});

gulp.task('browserSync', function() {
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

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['copySource']);
    gulp.watch('src/**/*.ts', ['typescript']);
});
