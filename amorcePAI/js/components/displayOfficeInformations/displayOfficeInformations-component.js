/**
 * Formulaire d'inscription et de modification de patient.
 * @type Module formNewPatient-template|Module formNewPatient-template
 */

// récuperer le template et le css
var template = require('./displayOfficeInformations-template.html');
require('./displayOfficeInformations-component.css');

// utilitaires et constantes
var utils = require('../../functionnalcore/utils');
var constants = require('../../constants.js');

module.exports = function (angularMod) {

    //var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);

    var Controller = function ($http, datah, $scope) {

        console.log("displayOfficeInformations");

        // conserver les références des services
        this.$http = $http;
        this.datah = datah;
        this.utils = utils;
        this.$scope = $scope;

        var vm = this;
        datah.getOfficeInformations().then(function (response){
            vm.informations = response;
        });
    };
    // injection de dépendance sous forme d'un tableau de chaine de caractères
    Controller.$inject = ["$http", constants.serviceDataHandler, "$scope"];

    angularMod.component("displayOfficeInformations", {
        template: template,
        controller: Controller,
        bindings: {
        }
    });
};
