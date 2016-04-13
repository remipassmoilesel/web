/**
 * Formulaire d'inscription et de modification de patient.
 * @type Module formNewPatient-template|Module formNewPatient-template
 */

// récuperer le template et le css
var template = require('./formPatient-template.html');
require('./formPatient-component.css');

// utilitaires et constantes
var utils = require('../../functionnalcore/utils');
var constants = require('../../functionnalcore/constants.js');

//var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);

var Controller = function ($http, datah, $scope, $mdToast) {

    // conserver les références des services
    this.$http = $http;
    this.datah = datah;
    this.utils = utils;
    this.$scope = $scope;
    this.$mdToast = $mdToast;

    // identifiant unique de formulaire
    this.formId = new Date().getTime();

    // pattern affectant les champs de texte
    this.patientInfoPattern = constants.patientInformationPattern;

    // dates utilisées dans les vérifications de formulaires
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.lowestDate = new Date(1900, 01, 01);
    this.highestDate = new Date();

    // le modèle manipulé, défini ici uniquement si non fourni en argument
    if (typeof this.patient === "undefined") {
        this.patient = {
            firstname: "Jean-claude",
            name: "DuGenou",
            nurse: "idInfirmier",
            gender: "A",
            birthdate: yesterday
        };
    }

    // l'état du fomulaire, défini uniquement si non fourni en argument
    if (typeof this.disabled === "undefined") {
        this.disabled = false;
    }

    // genres lisibles
    var genders = {"H": "Homme", "F": "Femme", "A": "Autre", "I": "Indéterminé"};
    this.prettyGender = genders[this.patient.gender] || genders["I"];

    // messages d'erreur
    this.formErrors = {
        'name': {
            label: 'Nom invalide',
            message: 'Seuls les caractères suivants sont autorisés: [a-zA-Z ]'
        },
        'firstname': {
            label: 'Prénom invalide',
            message: 'Seuls les caractères suivants sont autorisés: [a-zA-Z ]'
        }

    };

};
// injection de dépendance sous forme d'un tableau de chaine de caractères
Controller.$inject = ["$http", constants.serviceDataHandler, "$scope", "$mdToast"];

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
 * Valider le formulaire et l'envoyer
 * @returns {undefined}
 */
Controller.prototype.validFormAndSendData = function () {

    // vérfier les informations
    /*
     * /!\ Penser à vérifier si les variables sont indéfinies, ou le test regex passera
     */
    var patt = new RegExp(this.patientInfoPattern);

    if (typeof this.patient.name === "undefined" || patt.test(this.patient.name) === false) {
        this.showFormError("name");
        return;
    }

    if (typeof this.patient.firstname === "undefined" || patt.test(this.patient.firstname) === false) {
        this.showFormError("firstname");
        return;
    }

    //TODO
    // verifier que le patient n'existe pas déjà
    // .... faire les autres tests

    this.showAlert("Enregistrement en cours...");

    // envoyer le patient
    var vm = this;
    this.datah.addPatient(this.patient).then(function (response) {
        vm.showAlert("Enregistrement réussi.");
    }).catch(function (response) {
        vm.showAlert("Erreur lors de l'enregistrement.");
    });

    // notification du composant parent si necessaire
    if (typeof this.onFormValidated !== "undefined") {
        this.onFormValidated();
    }
};


/**
 * 
 * @param {type} message
 * @param {type} delay
 * @returns {undefined}
 */
Controller.prototype.showFormError = function (element) {

    var vm = this;
    this.$mdToast.show(
            {
                hideDelay: 6000,
                position: 'top right',
                controller: function () {
                    console.log(element);
                    console.log(vm.formErrors);
                    console.log(vm.formErrors[element]);
                    this.formErrorLabel = vm.formErrors[element].label;
                    this.formErrorMessage = vm.formErrors[element].message;
                    this.hide = vm.$mdToast.hide;
                },
                controllerAs: "$ctrl",
                template: require("./formErrorToast.html"),
                locals: {
                    element: element
                }
            })
            // fin de l'affichage
            .then(function () {
                vm.formErrorShowed = false;
            });
};

/**
 * Controlleur de popup "toast" qui permet d'afficher un message après une saisie incorrecte.
 */
var FormErrorToastController = function ($mdToast, element) {

    console.log(this);
    console.log(element);

    this.$mdToast = $mdToast;

    // nom
    if ("name" === element) {
        this.formErrorLabel = "Nom invalide";
        this.formErrorMessage = "Seuls les caractères suivants sont autorisés: [a-zA-Z ]";
    }
    // prénom
    else if ("firstname" === element) {
        this.formErrorLabel = "Prénom invalide";
        this.formErrorMessage = "Seuls les caractères suivants sont autorisés: [a-zA-Z ]";
    }
    // element non reconnu: erreur
    else {
        throw constants.INVALID_ARGUMENT + ": " + element;
    }

    console.log(this);
};
FormErrorToastController.$inject = ['$mdToast'];

module.exports = function (angularMod) {

    angularMod.component("formPatient", {
        template: template,
        controller: Controller,
        bindings: {
            patient: "<",
            disabled: "<",
            onFormValidated: "&"
        }
    });
};
