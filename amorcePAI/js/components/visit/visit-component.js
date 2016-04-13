/**
 * Composant de représentation d'une visite
 * @type Module formNewPatient-template|Module formNewPatient-template
 */

// récuperer le template et le css
var template = require('./visit-template.html');
require('./visit-component.css');

// utilitaires et constantes
var utils = require('../../functionnalcore/utils');
var constants = require('../../functionnalcore/constants.js');

var Controller = function ($http, datah, $scope) {

    // conserver les références des services
    this.$http = $http;
    this.datah = datah;
    this.$scope = $scope;

};
// injection de dépendance sous forme d'un tableau de chaine de caractères
Controller.$inject = ["$http", constants.serviceDataHandler, "$scope"];

module.exports = function (angularMod) {

    //var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);

    angularMod.component("visit", {
        template: template,
        controller: Controller,
        bindings: {
            data: "<"
        }
    });
};
