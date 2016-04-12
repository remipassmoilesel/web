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

var Controller = function (datah, $scope, $compile, $mdToast) {

    // si vrai, affiche des informations supplémentaires sur le controleur et autre..
    this.debugMode = true;

    // conserver une reference vers les services
    this.datah = datah;
    this.$scope = $scope;
    this.$compile = $compile;
    this.$mdToast = $mdToast;

    var actions = require("./menuactions.js");

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
     * Tableau utilisées pour les requetes à tentatives multiples. 
     * Voir this.newWomanRequest()
     * 
     * Ces tableaux conservent la traces des tentatives, sous la forme:
     * requestTb[fonctionAppelante] = information
     */
    this.requestAttempts = [];
    this.requestIntervals = [];

    // affichage lors de la création du composant
    this.menuElements.displayAllPatients.action(this,
            this.menuElements.displayAllPatients);

};

// injection de dépendance sous forme d'un tableau de chaine de caractères
Controller.$inject = [constants.serviceDataHandler, "$scope", "$compile", "$mdToast"];

/**
 * Réclame les données sur les patients au serveur 
 * @returns {undefined}
 */
Controller.prototype.updateNonAffectedPatients = function () {

    var vm = this;
    this.newWomanRequest(function () {
        return vm.datah.getNonAffectedPatients();
    }, function (response) {
        // mettre à jour le modèle
        vm.nonAffectedPatients = response;
    });

};

/**
 * Réclame les données sur les patients au serveur 
 * @returns {undefined}
 */
Controller.prototype.updateNurses = function () {

    var vm = this;
    this.newWomanRequest(function () {
        return vm.datah.getNurses();
    }, function (response) {
        // mettre à jour le modèle
        vm.allNurses = response;
    });

};

/**
 * Réclame les données sur les patients au serveur 
 * @returns {undefined}
 */
Controller.prototype.updatePatients = function () {

    var vm = this;
    this.newWomanRequest(function () {
        return vm.datah.getAllPatients();
    }, function (response) {
        // mettre à jour le modèle
        vm.allPatients = response;
    });

};

/**
 * Pure fonction javascript, plus longue à lire qu'a utiliser.
 * 
 * Permet de renouveller une action si elle échoue, et de prévenir l'utilisateur.
 * A utiliser dans les requetes asynchrones. La requete est éxécutée une fois
 * (funcpromise) et si elle réussi rien ne se passe d'autre.
 * 
 * Si elle échoue alors un compteur est déclenché qui tentera de renouveller cette requete
 * indéfiniment (mettre un maximum ?)
 * 
 * Si elle échoue plus de 4 fois un message averti l'utilisateur.
 * 
 * /!\ funcPromise s'éxécute dans l'environnement du controlleur
 * 
 * Test possible: lancer le cabinet médical, renommer le fichier source XML puis 
 * le renommer à son nom d'origine.
 * 
 * @param {type} funcPromise
 * @param {type} cbSuccess
 * @param {type} cbCatch
 * @returns {undefined}
 */
Controller.prototype.newWomanRequest = function (funcPromise, cbSuccess, cbCatch) {

    var vm = this;

    funcPromise.apply(vm)

            // requete réussie
            .then(function (response) {

                // notification de reprise si nécéssaire
                if (typeof vm.requestAttempts[funcPromise] !== "undefined" &&
                        vm.requestAttempts[funcPromise] > 4) {
                    vm.showAlert("Serveur à nouveau disponible.");
                }

                // remettre à zéro les compteurs
                vm.requestAttempts[funcPromise] = 0;
                clearInterval(vm.requestIntervals[funcPromise]);
                vm.requestIntervals[funcPromise] = undefined;

                cbSuccess(response);

            })

            // requete ratée: signaler éventuellement puis réessayer
            .catch(function (response) {

                console.log("Request fail: ", funcPromise, response);

                // lancer un compteur si besoin
                if (typeof vm.requestIntervals[funcPromise] === "undefined") {

                    vm.requestAttempts[funcPromise] = 1;

                    vm.requestIntervals[funcPromise] = setInterval(function () {
                        // re-executer funcPromise 
                        vm.womanRequest(funcPromise, cbSuccess, cbCatch);
                        funcPromise();
                    }, 400);
                }
                vm.requestAttempts[funcPromise]++;

                // notification si arrêt prolongé du service
                if (vm.requestAttempts[funcPromise] === 4) {
                    vm.showAlert("Serveur indisponible pour le moment.");
                }

                // execution du cbCatch
                if (typeof cbCatch !== "undefined") {
                    cbCatch(response);
                }
            });

};

/**
 * Afficher une petite pop up d'information
 * @param {type} message
 * @param {type} delay
 * @returns {undefined}
 */
Controller.prototype.showAlert = function (message, delay) {
    this.$mdToast.show(
            this.$mdToast.simple()
            .textContent(message)
            .position("top right")
            .hideDelay(delay || 2000)
            );
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
