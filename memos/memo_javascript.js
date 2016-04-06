

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
    template: template,
    'template': template,
            bindings: {
                titre: "@"
            }
}

// mécanisme de promesse
var promise = new Promise(function (resolve, rejected) {
    console.log("Traitement numéro 1");
    resolve();
});

promise.then(function () {
    console.log("Traitement numéro 2");
});

promise.catch(function () {
    console.log("Promesse non tenue");
});

// Afficher tous les champs d'un objet, sans les fonctions
var object = {
    var1: "./data/actes.xml",
    var2: "./data/cabinetInfirmier.xml",
    logAll: function () {

        console.log("Champs: ");
        for (var property in this) {
            if (typeof this[property] !== "function") {
                console.log("\t - " + property + ": " + this[property] + " - " + (typeof this[property]));
            }
        }
    }
};
