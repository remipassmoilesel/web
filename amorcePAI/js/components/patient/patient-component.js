/**
 * Composant de représentation d'un patient.
 * @type Module patient-template|Module patient-template
 */

// récuperer le template et le css
var template = require('./patient-template.html');
require('./patient-component.css');

// utilitaires et constantes
var utils = require('../../functionnalcore/utils.js');
var constants = require('../../constants.js');

var Controller = function ($mdDialog, $scope) {

    // utilitaires
    this.$mdDialog = $mdDialog;
    this.$scope = $scope;
    this.utils = utils;

    this.smallContent = "100px";
    this.largeContent = "200px";

    // copie des données pour modification dans le formulaire
    this.modificationsData = JSON.parse(JSON.stringify(this.data || {}));
    this.modificationsData.birthdate = new Date(this.modificationsData.birthdate);

    // données formattées à afficher en résumé
    var d = this.data.birthdate;
    var prettyBirthdate = d.getUTCDate() + "/" + d.getUTCMonth() + "/" + d.getUTCFullYear();
    this.summaryDatas = {
        "NSS": this.data.ssid,
        "Née le": prettyBirthdate + " (" + this.data.age + " ans)",
        "Adresse": this.data.adressComplete
    };

    // les modes d'affichage du patient
    this.availablesDisplayModes = ["summary", "complete", "visits", "modification"];
    this.setDisplayMode("summary");

};
Controller.$inject = ["$mdDialog", "$scope"];

Controller.prototype.setDisplayMode = function (mode) {

    if (this.availablesDisplayModes.indexOf(mode) === -1) {
        throw constants.INVALID_ARGUMENT + ": " + mode;
    }
    this.displayMode = mode;

};

/**
 * L'utilisateur vient de modifier le patient, notifier le parent si necessaire
 * @returns {undefined}
 */
Controller.prototype.formHasBeenValidated = function () {
    // notification du composant parent si necessaire
    if (typeof this.onPatientModified !== "undefined") {
        console.log("Appel de :", this.onPatientModified);
        this.onPatientModified();
    }
};

module.exports = function (angularMod) {

    angularMod.component("patient", {
        template: template,
        bindings: {
            data: "<",
            onPatientModified: "&"
        },
        controller: Controller
    });
};
