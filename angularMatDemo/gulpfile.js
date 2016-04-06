/*
 
 Projet simple Gulp, pour essai
 Sources:    http://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/
 https://www.smashingmagazine.com/2014/06/building-with-gulp/
 
 */

/*
 * Commandes préalables - sous GNU/Linux :)
 * Initialiser le répertoire avec un pakage.json
 * $ npm init
 *
 * Installer gulp:
 * $ npm install -g gulp
 *
 * Lier gulp au projet, deux solutions: liens seul ou installation locale
 * $ npm link gulp
 *
 * ou
 *
 * $ npm install gulp --save-dev
 *
 */

// appel de gulp dans le script ainsi que divers modules

var gulp = require('gulp')
        , webpack = require("webpack-stream")
        , jshint = require("gulp-jshint")
        , minifyHtml = require("gulp-minify-html")
        , uglify = require('gulp-uglify')
        , autoprefixer = require('gulp-autoprefixer')
        , cleanCSS = require('gulp-clean-css')
        , gzip = require('gulp-gzip')
        ;

// racine ou coder le projet
var sourceRoot = "./source/";

// racine de distribution
var distRoot = "./dist/";

// racine de distribution
var devRoot = "./dev/";

/**
 Fonction de journalisation de texte. Si inColor = true alors le texte sera écrit en bleu.
 */
var colors = require('colors/safe');
function log(text, inColor) {

    if (inColor) {
        text = colors.green(text);
    }

    console.log(text);
}

gulp.task("default", function () {

    //log("** Lancement de la tache 'default': " , true);

    // surveiller les erreurs dans les fichiers javascript
    gulp.src(sourceRoot + "*.js")
            .pipe(jshint())
            .pipe(jshint.reporter());

    // traitement des fichiers javascript
    gulp.src(sourceRoot + '*.js')
            .pipe(webpack())
            .pipe(gulp.dest(devRoot))
            .pipe(uglify())
            .pipe(gulp.dest(distRoot))
            .pipe(gzip())
            .pipe(gulp.dest(distRoot));

    // traitement des fichiers html
    gulp.src(sourceRoot + '*.html')
            .pipe(gulp.dest(devRoot))
            .pipe(minifyHtml())
            .pipe(gulp.dest(distRoot))
            .pipe(gzip())
            .pipe(gulp.dest(distRoot));

    // traitement des tratiement du css
    gulp.src(sourceRoot + '/*.css')
            .pipe(gulp.dest(devRoot))
            .pipe(cleanCSS())
            .pipe(gulp.dest(distRoot))
            .pipe(gzip())
            .pipe(gulp.dest(distRoot));

});


/*
 * Surveiller du code et éxécuter des taches lors de changements
 * Usage: gulp watch
 * Commande préalable: $ npm install --save-dev jshint
 */
gulp.task("watch", function () {

    var root = sourceRoot;

    // surveiller les changements
    var watcher = gulp.watch(root + "*", ['default']);

    // lorsque le watcher est pret
    watcher.on('ready', function (event) {
        log("");
        log("** Surveillance en cours dans: " + root, true);
    });

    // lors d'un changement sur un fichier
    watcher.on('change', function (event) {
        log("");
        log("** Changements détectés !", true);
        log('** Chemin(s): ' + event.path);
        log("");

    });

});
