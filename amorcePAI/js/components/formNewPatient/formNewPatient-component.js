/**
 * Formulaire d'inscription et de modification de patient.
 * @type Module formNewPatient-template|Module formNewPatient-template
 */

// récuperer le template et le css
var template = require('./formNewPatient-template.html');
require('./formNewPatient-component.css');

// utilitaires et constantes
var utils = require('../../functionnalcore/utils');
var constants = require('../../constants.js');

module.exports = function (angularMod) {

    //var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);

    var Controller = function ($http, datah) {

        // conserver les références des services
        this.$http = $http;
        this.datah = datah;
        this.utils = utils;

        // pattern affectant les champs de texte
        this.patientInfoPattern = '^ *[a-zA-Z -]+ *$';

        // dates utiles
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        this.lowestDate = new Date(1900, 01, 01);
        this.highestDate = new Date();

        // le modèle manipulé
        this.patient = {
            firstname: "Prénom",
            name: "Nom",
            nurse: "id",
            gender: "A",
            birthdate: yesterday
        };

    };
    // injection de dépendance sous forme d'un tableau de chaine de caractères
    Controller.$inject = ["$http", constants.serviceDataHandler];


    Controller.prototype.addPatient = function () {

        console.log("Ajout de : " + this.patient);

        // vérfier le nom et le prénom 

    };

    angularMod.component("formNewPatient", {
        template: template,
        controller: Controller,
        bindings: {
        }
    });
};
