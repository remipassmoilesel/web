
// Gulp doit être installer globalement et localement

// Voir Quench pour générer un projet


// Exemple de fichier avec Webpack / ....

    var gulp = require('gulp'), plumber = require('gulp-plumber'), rename = require('gulp-rename');
    var autoprefixer = require('gulp-autoprefixer');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var imagemin = require('gulp-imagemin'), cache = require('gulp-cache');
    var minifycss = require('gulp-minify-css');
    var sass = require('gulp-sass');
    var browserSync = require('browser-sync');
    var webpack = require('webpack-stream');
    var concatCss = require('gulp-concat-css');

    gulp.task('browser-sync', function() {
      browserSync({
        server : {
          baseDir : "./"
        }
      });
    });

    gulp.task('bs-reload', function() {
      browserSync.reload();
    });

    gulp.task('images', function() {
      gulp.src('src/images/**/*')
          .pipe(cache(imagemin({optimizationLevel : 3, progressive : true, interlaced : true})))
          .pipe(gulp.dest('dist/images/'));
    });

    gulp.task('styles', function() {
      gulp.src([

        'src/styles/**/*.scss',

        'bower_components/jquery-ui/themes/base/jquery-ui.css',

      ])
          .pipe(plumber({
            errorHandler : function(error) {
              console.log(error.message);
              this.emit('end');
            }
          }))
          .pipe(sass())
          .pipe(autoprefixer('last 2 versions'))
          .pipe(concatCss("bundle.css"))
          .pipe(gulp.dest('dist/styles/'))
          .pipe(rename({suffix : '.min'}))
          .pipe(minifycss())
          .pipe(gulp.dest('dist/styles/'))
          .pipe(browserSync.reload({stream : true}))

    });

    gulp.task('scripts', function() {
      return gulp.src('src/scripts/**/*.js')
          .pipe(plumber({
            errorHandler : function(error) {
              console.log(error.message);
              this.emit('end');
            }
          }))
          .pipe(webpack({

            entry : './src/scripts/visualisation.js',

            resolve : {
              modulesDirectories : ["web_modules", "node_modules", "bower_components"]
            },

            output : {
              filename : './visualisation.js'
            }

          }))
          .pipe(gulp.dest('dist/scripts/'))
          .pipe(rename({suffix : '.min'}))
          .pipe(uglify())
          .pipe(gulp.dest('dist/scripts/'))
          .pipe(browserSync.reload({stream : true}))
    });

    gulp.task('default', ['browser-sync', "scripts", "styles"], function() {

      gulp.watch("src/styles/**/*.scss", ['styles']);
      gulp.watch("src/scripts/**/*.js", ['scripts']);
      gulp.watch("*.html", ['bs-reload']);
    });

// ERROR in multi main
// Module not found: Error: Cannot resolve 'file' or 'directory' /home/remipassmoilesel/projects/www/markdown-js/src/scripts/main.js in /home/remipassmoilesel/projects/www/markdown-js
//  @ multi main

// Ce genre d'erreur legerement enervante peut appraitre si il y a une erreur dans package.json


// appel de gulp
var gulp = require("gulp");

// tache par défaut
gulp.task('default', function () {
   // Your default task
});

// afficher du texte
gulp.task('greet', function () {
   console.log('Hello world!');
});

// assembler des taches
gulp.task('newName', ['task1', 'task2', 'task2']);
gulp.task('build', ['css', 'js', 'imgs']);

// Gulp travaille avec des flux. Pour sourcer et écrire un flux:
gulp.src('path/to/src');
gulp.dest('path/to/dest');


// inclure un fichier avec webpack
// !!! Inclure le './' dans le chemin pour lui indiquer qu'il s'agit d'un fichier local
var file = require("./file.js");

// inclure un module node/npm
var module = require("module");

// exemple de module, à placer dans un fichier séparé

    // configuration d'un module
    function ModuleExample() {
        this.value = "Value";
    }

    ModuleExample.prototype.doSomething = function (str) {
        document.alert("Something !" + str);
    };

    // exporter à partir du modules des fonctions et des valeurs
    // Attention au S de export !
    module.exports = new ModuleExample();

    // ou

    module.exports = {
        //...
    };

// appel du module
var exampleModule = require("./moduleExample.js");
console.log(exampleModule);
