var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps')
    coffee = require('gulp-coffee'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
    del = require('del');

var coffeeSources = ['scripts/hello.coffee'],
    jsSources = ['scripts/*.js'],
    sassSources = ['styles/*.scss'],
    htmlSources = ['**/*.html'],
    outputDir = 'assets';


gulp.task('log', function() {
    gutil.log('== My First Task ==')
});

gulp.task('copy', function() {
    gulp.src('index.html')
    .pipe(gulp.dest(outputDir))
});

gulp.task('sass', function() {
    gulp.src(sassSources)
    .pipe(maps.init())
    .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
    .pipe(maps.write('./'))
    .pipe(gulp.dest('assets'))
    .pipe(connect.reload())
});

gulp.task('coffee', function() {
    gulp.src(coffeeSources)
    .pipe(coffee({bare: true})
    .on('error', gutil.log))
    .pipe(gulp.dest('scripts'))
});

gulp.task('js', function() {
    gulp.src(jsSources)
    .pipe(maps.init())
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    })
});

gulp.task('html', function() {
    gulp.src(htmlSources)
    .pipe(connect.reload())
});

gulp.task('default', ['log', 'copy', 'html', 'coffee', 'js', 'sass', 'connect', 'watch']);