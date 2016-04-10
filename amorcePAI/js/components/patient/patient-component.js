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

var Controller = function () {

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
