/**
 * Formulaire d'inscription et de modification de patient.
 * @type Module formNewPatient-template|Module formNewPatient-template
 */

// récuperer le template et le css
var template = require('./displayOfficeInformations-template.html');
require('./displayOfficeInformations-component.css');

// utilitaires et constantes
var utils = require('../../functionnalcore/utils');
var constants = require('../../functionnalcore/constants.js');

var Controller = function ($http, datah, $scope) {

    // conserver les références des services
    this.$http = $http;
    this.datah = datah;
    this.utils = utils;
    this.$scope = $scope;

    // recuperer les informations (adresse, ...)
    var vm = this;
    datah.getOfficeInformations().then(function (response) {
        vm.informations = response;
    });

    // récupérer des statistiques
    datah.getAllPatients().then(function (response) {
        vm.totalPatients = response.length;
    });
    datah.getNurses().then(function (response) {
        vm.totalNurses = response.length;
    });


};
// injection de dépendance sous forme d'un tableau de chaine de caractères
Controller.$inject = ["$http", constants.serviceDataHandler, "$scope"];

module.exports = function (angularMod) {

    angularMod.component("displayOfficeInformations", {
        template: template,
        controller: Controller,
        bindings: {
        }
    });
};
