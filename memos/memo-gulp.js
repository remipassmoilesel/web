
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

