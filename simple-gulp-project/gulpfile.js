var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');

var webpack = require('webpack-stream');
var named = require('vinyl-named');

var webpackEntries = ['src/scripts/main.js'];

/*
Gestion des images
*/
gulp.task('images', function() {
    gulp.src('src/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images/'));
});

/*
Gestion des styles
*/
gulp.task('styles', function() {
    gulp.src(['src/styles/**/*.css'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles/'));
});

/*
Gestion des scripts
*/
gulp.task('scripts', function() {
    return gulp.src(webpackEntries)
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(named())
        .pipe(webpack({
            progress: false,
            stats: {
                colors: true,
                modules: false,
                reasons: false
            },
            watch: true
        }))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'));
});

/*
Tache par défaut
*/
gulp.task('default', ['scripts', 'styles', 'images'], function() {
    gulp.watch("src/styles/**/*.css", ['styles']);
    gulp.watch("src/scripts/**/*.js", ['scripts']);
    gulp.watch("src/images/**", ['images']);
});
