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

    this.$mdDialog = $mdDialog;
    this.$scope = $scope;

    this.utils = utils;

    this.displayableDatas = {
        "Date de naissance": this.data.birthdate + " (" + this.data.age + " ans)",
        "NSS": this.data.ssid,
        "Adresse": this.data.adressComplete
    };

};

Controller.$inject = ["$mdDialog", "$scope"];

Controller.prototype.displayVisits = function (event) {

    var dialogTemplate = require("./patient-dialogtemplate.html");

    this.$mdDialog.show({
        controller: DialogController,
        template: dialogTemplate,
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: false
    });

};

var DialogController = function ($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
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
