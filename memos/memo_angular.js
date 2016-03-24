
// /!\ Les modules angular sont différents des modules CommonJS/Webpack

// appel d'angular et angular-material avec webpack/gulp
var angular = require("angular");
var angularMaterial = require("angular-material");
require("angular-material/angular-material.css");

// Créer un nouveau module vide
var mod = angular.module("module", []);
// ou créer un nouveau module contenant des élements d'autres modules
var extMod = angular.module("moduleEtendu", [angularMaterial]);

// Ajouter un composant
/*
 * Remarque sur les noms: Dans la déclaration Angular le nom doit respecter 
 * la norme Camel Case (ecritCommeCa) alors que dans le code html les mots sont 
 * séparés par des tirets (ecrit-comme-ca)
 */
mod.component("nomComposant", {
    // Le template HTML à charger, éventuellement chargé à partir d'un fichier
    template: "...",
    // Ajouter des liaisons de donnée, ici un argument spécial de la balise
    bindings: {
        customArg: "@"
    },
    controller: function () {
        // Le controleur est un objet instancié à chaque création de composant. 
        // Cette fonction agit comme un constructeur. Il sera ensuite disponible 
        // dans le composant via $ctrl
    }
});

/*
 * Appel dans le fichier HTML
 * <body ng-app="module">
 * ...
 * <nom-composant customArg='value'>
 * ...
 * {{$ctrl.doSomething()}}
 */

/*
 * Méthode angular de création de directives, à utiliser uniquement 
 * pour les besoins spécifiques. Préférer les constructeurs de composants.
 */

// exemple de balise
// <bhsm-liste data="myDataObject" titre="Ma liste de course" onModified="console.log('hello!');">

// ajouter une directive, toutes les balises bshm-liste d'un document html seront "compilés"
app.directive("bshm-liste", function () {
    return {
        restrict: 'E', // 'E' pour balise, 'A' pour attribut
        binToController: true,
        controllerAs: "ctrl", // nom du controlleur, ou définition: function(){
        template: "...", // template html de l'élément
        scope: {
            data: "<", // valeur sera un objets
            titre: "@", // valeur sera du texte
            onModified: "&" // evaluer comme du javascript
        }
    };
});

