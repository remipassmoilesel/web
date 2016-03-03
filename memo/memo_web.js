/*
 
Mémo sur le cours web2 / architecture
-------------------------------------- 

 Sources d'nformation interressantes: 
 
 Mozilla Developper Network
 Livre: Eloquent Javascript (pour Javascript 5, actuel: 6)
 Freenode IRC

A voir sur les tableaux: map reduce filter findindex

A voir: les bases de modules
 
*/





// ancienne méthode de séparation de code
(function () {
    // création de fonction et appel
})();

// nouvelle méthode: système de module

function Chose(arg1, arg2) {
    this.field1 = arg1;
    this.field2 = arg2;
}

// créer un objet ...
var c = new Chose();

// ... revient à faire
var obj = Object.create(Chose.prototype);
Chose.apply(c);


// Appliquer une fonction à un objet, avec argument
var arg1 = "arg1";
var arg2 = "arg2";
Chose.apply(c, arg1, arg2);
// c -> devient this dans function Chose(){ ...

// créer un objet
var obj = {};
// equvalent à
var obj = Object.create({});

// Voir cette méthode
Array.bind()


// exemple d'implementation de pattern observer
Chose.prototype.onUpdate = function (callbackFunction) {
    // ou cbUpdates est un tableau
    this.cbUpdates.push(callbackFunction);
};
Chose.prototype.fireEvent = function () {
    // for ... {
    //      callback(this)
    // }
};

// valeur par défaut d'un argument de fonction
function func1(arg1) {
    this.liste = arg1 || [];
    // liste sera arg1 ou un tableau vide si arg1 = undefined
}

// exemple de méthode polymorphe
function Liste() { }
;
Liste.prototype.removeSomething = function (data) {
    switch (typeof data) {
        case 'object':
        pos = this.indexOf(data);
        break;
        case 'string':
        pos = this.liste.findIndex(
            function (element) {
                return e.texte == data;
            });
        break;

            // ...
        }

        if (pos >= 0) {
        // remove ...
    }

};


// tableau: trouver un index en fonction de paramètres
elementPosition = this.tableau.findIndex(
    function (element) {
        return element.attribut == data;
            // si retourne vrai, findIndex retournera l'index 
        }
        );

/*
 Une fonction voit:
 - ses arguments,
 - variables locales,
 - variables globales,
 - variables incluses par closures, cad incluses dans la fonction
 
 
 Vanilla javascript: javascript sans bibliothèques
 
 */

// 
// Modualarité: Importer un fichier 
var Chose = require("path/to/file.js");

// Modularité: exporter un objet 
module.exports = Chose;

// !!! les require et les exports seront utilisés par la chaine de compilation

/*
 
 Chaine de compilation
 ---------------------
 
Chaines connues: GULP et GRUNT
GRUNT serait sur la fin, GULP serait plus efficace
        
Voir: http://gulpjs.com/
webpack
        
 Les chaines servent à:
 - préfixer automatiquement du CSS avec webkit- moz- ...
 - convertir du ES6 (Javascript 6) en ES3 (JS 3)
 - limiter le nombrede fichier à envoyer, minifier les fichiers, ...
 - vérification de code: passage d'analyseur de code pour interdire certaine pratique, formater du code, ...
 
Getting started
---------------

installer nodejs et gulp
faire un gulpfile
$ gulp
 
possible ide sympa: webstorm 
*/





























