
// accéder à la fenetre parente à partir d'une iframe:
parent.window

/**
 * call, bind, apply
 */

var functionTest = function(arg1, arg2) {
  console.log(this);
  console.log(arguments);
};

// target this
var thisVar = {field1 : "field1"};

functionTest.call(thisVar, arg1, arg2); // call with new "this" and separated args
functionTest.apply(thisVar, [arg1, arg2]); // same but call with array of arg
functionTest.bind(thisVar, arg1, arg2)(); // create a new function



// Expressions régulières
var monExpressionReguliere = new RegExp("d(b+)d", "g");
var monTableau = monExpressionReguliere.exec("cdbbdbsbz");

// Copie profonde d'objets

var obj = ["json", {
  test : ["Hello", "World"], test2 : "eeee"
}, "sam"];

console.log(obj);
console.log(JSON.parse(JSON.stringify(obj)));

// Combiner des promesses: Promise.all()

var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, "toto");
});

Promise.all([p1, p2, p3]).then(function(values) {
  console.log(values); // [3, 1337, "toto"]
});

// Arrondir un nombre
(8 * 8.52).toFixed(2);

// tester si tableau
console.log(array instanceof Array);

/**
 * Modules exportés vides ? Attention à l'orthographe de module.exports !!!!
 */
module.export = {
  "rien ne sortira d'ici sans s a export" : "Dans le ... Lulu !"
}

// Meilleure méthode pour tester si undefined, qui ne déclenche pas d'erreur
if (typeof this.patient.name === "undefined") {
  // source: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/undefined
}

// dates
var getPrettyDate = function(date) {
  var sep = "/";
  if (typeof date === "undefined") {
    date = new Date();
  }
  return date.getDate() + sep + date.getMonth() + sep + date.getFullYear();
};

// iterer un tableau
for (var i = 0; i < array.length; i++) {
  alert(array[i]);
}

/*
 * Attention, le for in sert à itérer les propriétés d'un objet, pas un tableau. Dans l'exemple ci-dessous:
 * "a", "b", "c" et "foo!"
 */
Array.prototype.foo = "foo!";
var array = ['a', 'b', 'c'];

for (var i in array) {
  alert(array[i]);
}

// garder une reference à un this défini
// sans l'usage de self, le this de la fonction ne sera peut être pas celui que l'on désire
function Object() {

  var self = this;
  return function doSomething() {
    self.data = "something";
  };

}

// Afficher tout d'un objet sauf ses fonctions
function displayAllPropertiesFrom(obj) {

  console.log("Constantes: ");

  for (var property in this) {
    if (typeof obj[property] !== "function") {
      console.log("\t - " + property + ": " + obj[property] + " - " + (typeof obj[property]));
    }
  }
}

// copier dans un nouveau tableau (copie de surface)
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// transformer des objets ressemblant à des tableaux en tableaux
var arrayCopy = Array.prototype.slice.apply(array1, []);

function list() {
  // arguments représente tous les arguments de la fonction (mais n'est pas un tableau)
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var anonymObject = {
  template : template, 'template' : template, bindings : {
    titre : "@"
  }
}

// mécanisme de promesse
var promise = new Promise(function(resolve, rejected) {
  console.log("Traitement numéro 1");
  resolve();
});

promise.then(function() {
  console.log("Traitement numéro 2");
});

promise.catch(function() {
  console.log("Promesse non tenue");
});

// Afficher tous les champs d'un objet, sans les fonctions
var object = {
  var1 : "./data/actes.xml", var2 : "./data/cabinetInfirmier.xml", logAll : function() {

    console.log("Champs: ");
    for (var property in this) {
      if (typeof this[property] !== "function") {
        console.log("\t - " + property + ": " + this[property] + " - " + (typeof this[property]));
      }
    }
  }
};

// executer quelque chose et eventuellement recommencer
function foo() {
  // do stuff
  // ...

  // and schedule a repeat
  setTimeout(foo, delay);
}

// start the cycle
foo();

/**
 * Essai sur les promesses
 *
 * /!\ Attention: les promesses angular sont différentes des promesses javascript. Les p angular
 * mettent à jour les controleurs.
 */

// promesse attendant 3 seconde avant de se résoudre
var p = new Promise(function(resolve, reject) {

  setTimeout(resolve, 3000);

});

function testPromise() {
  return p.then(function() {
    console.log("Hello !");
    return "Text";
  }).then(function(resp) {
    console.log("Hello 2 !");
    console.log(resp);
  });
}

console.log("Appel de la fonction avec promesse");
testPromise();
