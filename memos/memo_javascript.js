var anonymObject = {
  template: template,
  'template': template,
  bindings: {
    titre: "@"
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

  var1: "./data/actes.xml",
  var2: "./data/cabinetInfirmier.xml",

  logAll: function() {

    console.log("Champs: ");
    for (var property in this) {
      if (typeof this[property] !== "function") {
        console.log("\t - " + property + ": " + this[property] + " - " + (typeof this[property]));
      }
    }
  }
};
