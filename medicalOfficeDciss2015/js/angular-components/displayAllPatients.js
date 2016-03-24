/*
 * Module Angular d'affichage de tous les patients
 * 
 * @type 
 */

// récupérer le template et le stocker dans la variable template
var template = require("../../templates/displayAllPatients.html");

/**
 * Attend un module angular en paramètre, puis créé un composant et l'ajoute au module
 * @param {type} mod
 * @returns {undefined}
 */
module.exports = function (angularMod) {

    console.log("Création d'un module d'affichage de tous les patients")

    // enregistrer le service de données
    var datahandler = require("../functionnal-core/data-handler.js");
    angularMod.service("datahandler", datahandler);

    // Controlleur instancié à la création du composant
    var controller = function () {
        console.log("Nouveau controlleur créé pour displayAllPatients");
        this.var = "Value";
    };

    // Créer un nouveau composant (camel case obligatoire)
    angularMod.component("displayAllPatients", {
        template: template,
        bindings: {},
        controller: controller
    });
};

