
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
