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

    // afficher les informations
    ctrl.displaySection(ownerElement);

};

/**
 * Afficher le formulaire de recherche de patients
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuActions.prototype.displaySearchPatient = function (ctrl, ownerElement) {

    // afficher les informations
    ctrl.displaySection(ownerElement);

};

/**
 * Afficher tous les patients dans l'espace de travail
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuActions.prototype.displayAllPatients = function (ctrl, ownerElement) {

    // mettre à jour les patients
    ctrl.updatePatients();

    // afficher la section de page, avant l'arrivée des données
    ctrl.displaySection(ownerElement);

};
/**
 * Afficher tous les patients dans l'espace de travail
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuActions.prototype.displayAllNurses = function (ctrl, ownerElement) {

    // mettre à jour les patients
    ctrl.datah.getNurses().then(function (response) {
        ctrl.allNurses = response;
    });

    // afficher la section de page, avant l'arrivée des données
    ctrl.displaySection(ownerElement);

};
/**
 * Afficher tous les patients dans l'espace de travail
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuActions.prototype.displayNonAffectedPatients = function (ctrl, ownerElement) {

    // mettre à jour les patients
    ctrl.datah.getNonAffectedPatients().then(function (response) {
        ctrl.nonAffectedPatients = response;
    });

    // afficher la section de page, avant l'arrivée des données
    ctrl.displaySection(ownerElement);

};
/**
 * Afficher le formulaire d'ajout de patient
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuActions.prototype.displayAddPatientForm = function (ctrl, ownerElement) {

    // afficher la section de page, avant l'arrivée des données
    ctrl.displaySection(ownerElement);

};
/**
 * Afficher le formulaire d'ajout de patient
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuActions.prototype.showController = function (ctrl, ownerElement) {

    // afficher la section de page, avant l'arrivée des données
    ctrl.displaySection(ownerElement);

};


var Controller = function (datah, $scope, $compile) {

    // si vrai, affiche des informations supplémentaires sur le controleur et autre..
    this.debugMode = true;

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
        displaySearchPatients: {
            label: "Rechercher un patient",
            action: actions.displaySearchPatient
        },
        displayAddPatientForm: {
            label: "Ajouter un patient",
            action: actions.displayAddPatientForm
        },
        displayNonAffectedPatients: {
            label: "Liste des patients non affectés",
            action: actions.displayNonAffectedPatients
        },
        displayAllPatients: {
            label: "Liste de tous les patients",
            action: actions.displayAllPatients
        },
        displayAllNurses: {
            label: "Liste de tous les infirmiers",
            action: actions.displayAllNurses
        },
        displayOfficeInfos: {
            label: "Informations sur le cabinet",
            action: actions.displayOfficeInformations
        }
    };

    // listes des elements affichés uniquement en mode debug
    if (this.debugMode) {
        this.menuElements.showController = {
            label: "Contrôleur de cabinet médical",
            action: actions.showController
        };
    }

    /*
     * Elements de mise à jour des patients
     */
    this.patientUpdateAttempt = 0;
    this.patientUpdater = undefined;

    // affichage lors de la création du composant
    this.menuElements.displayAllPatients.action(this,
            this.menuElements.displayAllPatients);



};

// injection de dépendance sous forme d'un tableau de chaine de caractères
Controller.$inject = [constants.serviceDataHandler, "$scope", "$compile"];

/**
 * Réclame au serveur et mets à jour la liste des patients 
 * @returns {undefined}
 */
Controller.prototype.updatePatients = function () {

    var vm = this;

    this.datah.getAllPatients()

            // requete réussie
            .then(function (response) {
                // mettre à jour le modèle
                vm.allPatients = response;

                // remettre à zéro les essais
                vm.patientUpdateAttempt = 0;
                clearInterval(vm.patientUpdater);
                vm.patientUpdater = undefined;
            })

            // erreur: signaler puis réessayer
            .catch(function (resp) {
                console.log("Request fail: ", resp);
                console.log(vm.patientUpdater);
                console.log(vm.patientUpdateAttempt);
                if (typeof vm.patientUpdater === "undefined") {
                    vm.patientUpdater = setInterval(function () {
                        vm.updatePatients.apply(vm);
                    }, 400);
                }
                vm.patientUpdateAttempt++;
            });

};


/**
 * Masque tous les elements de menu et affiche l'element passe en parametre
 * @param {type} menuElementToShow
 * @returns {undefined}
 */
Controller.prototype.displaySection = function (menuElementToShow) {

    for (var elmt in this.menuElements) {
        this.menuElements[elmt].visible = false;
    }

    menuElementToShow.visible = true;
};

module.exports = function (angularMod) {

    // création du composant cabinet medical
    angularMod.component("medicalOffice", {
        template: template,
        controller: Controller
    });
};
