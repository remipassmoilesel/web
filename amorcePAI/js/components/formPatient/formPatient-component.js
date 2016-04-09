/**
 * Formulaire d'inscription et de modification de patient.
 * @type Module formNewPatient-template|Module formNewPatient-template
 */

// récuperer le template et le css
var template = require('./formPatient-template.html');
require('./formPatient-component.css');

// utilitaires et constantes
var utils = require('../../functionnalcore/utils');
var constants = require('../../constants.js');

module.exports = function (angularMod) {

    //var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);

    var Controller = function ($http, datah, $scope) {

        // conserver les références des services
        this.$http = $http;
        this.datah = datah;
        this.utils = utils;
        this.$scope = $scope;

        // pattern affectant les champs de texte
        this.patientInfoPattern = '^ *[a-zA-Z éàï-]+ *$';

        // dates utiles
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        this.lowestDate = new Date(1900, 01, 01);
        this.highestDate = new Date();

        // le modèle manipulé
        this.patient = {
            firstname: "Jean-claude",
            name: "DuGenou",
            nurse: "idInfirmier",
            gender: "A",
            birthdate: yesterday
        };

    };
    // injection de dépendance sous forme d'un tableau de chaine de caractères
    Controller.$inject = ["$http", constants.serviceDataHandler, "$scope"];

    /**
     * Affiche un message dans le formulaire pour une durée déterminée en ms (temps optionnel)
     * @param {type} msg
     * @param {type} timeDisplayMs
     * @returns {undefined}
     */
    Controller.prototype.showFormMessage = function (msg, timeDisplayMs) {

        // afficher le message
        this.controllerMessageSpace = msg;

        // si le temps est déterminé l'effacer
        if (typeof timeDisplayMs !== "undefined") {

            var vm = this;
            setTimeout(function () {
                vm.controllerMessageSpace = " ";
                vm.$scope.$apply();
            }, timeDisplayMs);
        }

    };

    Controller.prototype.addPatient = function () {

        console.log("Ajout de : " + this.patient.name);

        // reinitialiser les messages du GUI
        this.showFormMessage("Enregistrement en cours");

        // vérfier les informations
        var patt = new RegExp(this.patientInfoPattern);
        if (patt.test(this.patient.name) === false) {
            this.showFormMessage("Nom invalide");
            return;
        }

        if (patt.test(this.patient.firstname) === false) {
            this.showFormMessage("Prénom invalide");
            return;
        }

        //TODO
        // verifier que le patient n'existe pas déjà
        // .... faire les autres tests

        // envoyer le patient
        var vm = this;
        this.datah.addPatient(this.patient).then(function (response) {
            console.log(response);
            vm.showFormMessage("Enregistrement réussi.", 2000);

        }).catch(function (response) {
            console.log(response);
            vm.showFormMessage("Erreur lors de l'enregistrement.");
        });

    };

    angularMod.component("formPatient", {
        template: template,
        controller: Controller,
        bindings: {
        }
    });
};
