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

// appel de gulp dans le script
var gulp = require('gulp');

// racine de développement
var devRoot = "./dev/";

// racine de distribution
var distRoot = "./dist/";

/*
* Minifier du HTML
* Usage: gulp minify-html
* Commande préalable: $ npm install --save-dev gulp-minify-html
*/
var minifyHtml = require("gulp-minify-html");
gulp.task('minify-html', function () {
  gulp.src(devRoot + '*.html')
  .pipe(minifyHtml())
  .pipe(gulp.dest(distRoot));
});

/*
* Minifier du CSS
* Usage: gulp minify-css
* Commande préalable: $ npm install --save-dev gulp-clean-css
*/
var cleanCSS = require('gulp-clean-css');
gulp.task('minify-css', function() {
  return gulp.src(devRoot + '*.css')
  .pipe(cleanCSS())
  .pipe(gulp.dest(distRoot));
});

/*
* Minifier du Javascript
* Usage: gulp uglify
* Commande préalable: $ npm install --save-dev gulp-uglify
*/
var uglify = require('gulp-uglify');
gulp.task('uglify', function() {
  return gulp.src(devRoot + '*.js')
  .pipe(uglify())
  .pipe(gulp.dest(distRoot));
});

/*
* Surveiller du code javascript
* Usage: gulp jshint
* Commande préalable: $ npm install --save-dev jshint
*/
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
  gulp.src(devRoot + "*.js")
  .pipe(jshint())
  .pipe(jshint.reporter());
});

/*
* Affecter une tache par defaut.
* Usage: gulp
*/
gulp.task("default", ['minify-html', 'minify-css', 'uglify', 'jshint']);

/**
Fonction de journalisation de texte. Si inColor = true alors le texte sera écrit en bleu.
*/
var colors = require('colors/safe');
function log(text, inColor){

  if(inColor == undefined){
    inColor = false;
  }
  if(inColor){
    text = colors.green(text);
  }

  console.log(text);
}

/*
* Surveiller du code et éxécuter des taches lors de changements
* Usage: gulp watch
* Commande préalable: $ npm install --save-dev jshint
*/
gulp.task("watch", function(){

  // surveiller les changements
  var watcher = gulp.watch(devRoot + "*", ['default']);

  // lorsque le watcher est pret
  watcher.on('ready', function (event) {
    log("");
    log("** Surveillance en cours ...", true);
  });

  // lors d'un changement sur un fichier
  watcher.on('change', function (event) {
    log("");
    log("** Changements détectés !", true);
    log('** Chemin(s): ' + event.path);
    log("");

  });

});
