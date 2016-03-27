/*
 * Module Angular d'affichage de tous les patients
 *
 * @type
 */

/**
 * Attend un module angular en paramètre, puis créé un composant et l'ajoute au module
 * @param {type} mod
 * @returns {undefined}
 */
module.exports = function (angularMod) {

    // enregistrer le service de données
    var datahandler = require("../functionnal-core/data-handler.js");
    angularMod.service("datahandler", datahandler);

    // Controlleur instancié à la création du composant
    var controller = function () {
        console.log("Nouveau controlleur créé pour displayAllPatients");
        this.allPatients = "Value";
    };

    // Créer un nouveau composant (camel case obligatoire)
    angularMod.component("allPatientsComponent", {
        bindings: {},
        controller: controller,
        template: [
            '<table>',
            '<h3>Liste de tous les patients</h3>',
            '{{$ctrl}}',
            '</table>'].join('')
    });
};
