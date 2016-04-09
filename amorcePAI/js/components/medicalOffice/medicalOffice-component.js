/**
 * Composant de représentation d'un cabinet médical. Comprend un espace de travail et un menu. 
 * @type Module medicalOffice-template|Module medicalOffice-template
 */

// récuperer le template et le css
var template = require('./medicalOffice-template.html');
require('./medicalOffice-component.css');
// utilitaires et constantes
var utils = require('../../functionnalcore/utils.js');
var constants = require('../../constants.js');


/**
 * Objet rassemblant toutes les méthodes d'affichage des elements de menu.
 * 
 * Toutes ses méthode prennent en paramètre le controleur source et l'objet parent (contenant 
 * description et eventuellements caractéristiques supplémentaires.
 * 
 * Les actions n'ont pas été intégrées au controlleur pour éviter les problèmes de contexte
 * d'appel des fonctions (cause ng-click)
 * 
 * @returns {nm$_medicalOffice-component.DisplayActions}
 */
function MenuActions() {}

/**
 * Afficher les informations du le cabinet
 * 
 * @param {type} ctrl
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuActions.prototype.displayOfficeInformations = function (ctrl, ownerElement) {
    ctrl.displayWorkspaceElements("<office-informations></office-informations>");
};

/**
 * Afficher tous les patients dans l'espace de travail
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuActions.prototype.displayPatients = function (ctrl, ownerElement) {

};


var Controller = function (datah, $scope, $compile) {

    // conserver une reference vers les services
    this.datah = datah;
    this.$scope = $scope;
    this.$compile = $compile;

    var actions = new MenuActions();

    /* 
     Les élements affichés dans le menu et les fonctions associées permettant 
     de déclencher les actions. Pour ajouter un element dans le menu, ajouter un objet.
     */
    this.menuElements = {
        displayOfficeInfos: {
            label: "Informations sur le cabinet",
            action: actions.displayOfficeInformations
        },
        displayPatients: {
            label: "Afficher tous les patients",
            action: actions.displayPatients
        },
        displayNurses: {
            label: "Afficher tous les infirmiers",
            action: actions.displayPatients
        },
        displayNonAffectedPatients: {
            label: "Afficher les patients non affectés",
            action: actions.displayNonAffectedPatients
        },
        displayAddPatientForm: {
            label: "Ajouter un patient",
            action: actions.displayAddPatientForm
        }
    };

    // section à recycler en actions de menu
    var vm = this;
    datah.getNurses().then(function (response) {
        vm.nurses = response;
    });
    datah.getAllPatients().then(function (response) {
        vm.allPatients = response;
    });
    datah.getNonAffectedPatients().then(function (response) {
        vm.nonAffectedPatients = response;
    });

};

// injection de dépendance sous forme d'un tableau de chaine de caractères
Controller.$inject = [constants.serviceDataHandler, "$scope", "$compile"];



module.exports = function (angularMod) {
    // création du composant
    angularMod.component("medicalOffice", {
        template: template,
        controller: Controller
    });
};
