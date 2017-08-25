var gulp = require('gulp');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');

gulp.task('default', ['watch']);

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

gulp.task('clean', function() {
    return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['clean', 'copySource', 'browserSync', 'watch']);
});
