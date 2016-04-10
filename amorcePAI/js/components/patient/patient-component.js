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

    // données formattées à afficher en résumé
    var dateParts = this.data.birthdate.split("-");
    var prettyBirthdate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    this.summaryDatas = {
        "NSS": this.data.ssid,
        "Née le": prettyBirthdate + " (" + this.data.age + " ans)",
        "Adresse": this.data.adressComplete
    };

    // données formattées à afficher 
    this.formatedDatas = {
        "Genre": this.data.gender === "M" ? "Homme" : "Femme",
        "Age": this.data.age,
        "Date de naissance": prettyBirthdate,
        "NSS": this.data.ssid,
        "Adresse": this.data.adressComplete,
        "Etage": this.data.adress
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
 * Controleur de la boite de dialogue de détil du patient
 */
var DialogController = function ($mdDialog, parentCtrl) {
    this.parentCtrl = parentCtrl;
    this.$mdDialog = $mdDialog;
    this.patient = parentCtrl.data;
};

module.exports = function (angularMod) {

    angularMod.component("patient", {
        template: template,
        bindings: {
            data: "<"
        },
        controller: Controller
    });
};
