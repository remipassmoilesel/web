
// /!!\ Les modules angular sont différent des modules CommonJS

// déclarer un nouveau module vide
var app = angular.module("bshm", []);

app.component("bshm-liste", {
    template: "...", // tamplate HTML
    binding: {}, // equivalent à scope,
    controller: function(){
        // le controleur sera accessible via $ctrl
    }
}); 


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

