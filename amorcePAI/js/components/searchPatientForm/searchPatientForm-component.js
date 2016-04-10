/**
 * Afficher un objet JSON de manière lisible
 * @type Module formNewPatient-template|Module formNewPatient-template
 */

// récuperer le template et le css
var template = require('./searchPatientForm-template.html');
require('./searchPatientForm-component.css');

// utilitaires et constantes
var utils = require('../../functionnalcore/utils');
var constants = require('../../constants.js');

var Controller = function ($http, datah, $scope) {

    // conserver les références des services
    this.$http = $http;
    this.datah = datah;
    this.utils = utils;
    this.$scope = $scope;

    // les informations a rechercher sur le patient
    this.patient = {
        name: "",
        firstname: ""
    };

    // les résultats de recherche
    this.results = [];
};
// injection de dépendance sous forme d'un tableau de chaine de caractères
Controller.$inject = ["$http", constants.serviceDataHandler, "$scope"];

/**
 * Recherche un patient et affiche des résultats
 * @returns {undefined}
 */
Controller.prototype.searchPatients = function () {

    // enlever les précédents résultats
    this.results = [];
    this.showFormMessage("");

    // vérifier le format des champs
    if (this.patient.name.length < 1 &&
            this.patient.firstname.length < 1) {
        this.showFormMessage("Vous devez remplir au moins un des champs.");
        return;
    }

    var vm = this;
    this.datah.searchPatients(this.patient).then(function (response) {

        if (response.length > 0) {
            vm.results = response;
        }

        // pas de résultats
        else {
            vm.showFormMessage("Aucun patient ne correspond à vos critères.", 5000);
        }
    });

};

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

module.exports = function (angularMod) {

    angularMod.component("searchPatientForm", {
        template: template,
        controller: Controller,
        bindings: {
        }
    });
};
