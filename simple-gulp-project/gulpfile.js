// Projet simple Gulp, pour essai
// Source: http://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/

// Installer gulp au préalable, -g pour globally
// $ npm install -g gulp

// Lier gulp au projet, deux solutions: liens seul ou installation locale
// $ npm link gulp
// ou
// $ npm install gulp --save-dev

// appel de gulp dans le script
var gulp = require('gulp')
, minifyHtml = require("gulp-minify-html");
 
// racine de développement
var devRoot = "./dev/";

// racine de distribution
var distRoot = "./dist/";

// minifier du HTML
// Usage: gulpminify-html
// Commande préalable: $ npm install --save-dev gulp-minify-html
gulp.task('minify-html', function () {
    gulp.src(devRoot + '*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest(distRoot));
});
