/*

 Mémo sur le cours web2 / architecture

 Sources interressantes: 
 
 Mozilla Developper Network
 Livre: Eloquent Javascript (pour Javascript 5, actuel: 6)
 Freenode IRC
 
 
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





























