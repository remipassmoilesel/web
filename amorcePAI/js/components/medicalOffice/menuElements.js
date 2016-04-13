
/**
 * Objet rassemblant toutes les méthodes d'affichage des elements de menu.
 * 
 * Toutes ses méthode prennent en paramètre le controleur source et l'objet parent (contenant 
 * description et eventuellements caractéristiques supplémentaires.
 * 
 * Les actions n'ont pas été intégrées au controlleur pour éviter les problèmes de contexte
 * d'appel des fonctions (cause ng-click)
 * 
 * Pas non plus la possiblité d'utiliser call sur les fonctions, c'est apparement interdit dans un 
 * composant angular.
 * 
 * @returns {nm$_medicalOffice-component.DisplayActions}
 */
function MenuElements() {

    this.displaySearch = {
        label: "Rechercher",
        action: this.displaySearch
    };
    this.displayAddPatientForm = {
        label: "Ajouter un patient",
        action: this.displayAddPatientForm
    };
    this.displayNonAffectedPatients = {
        label: "Liste des patients non affectés",
        action: this.displayNonAffectedPatients
    };
    this.displayAllPatients = {
        label: "Liste de tous les patients",
        action: this.displayAllPatients
    };
    this.displayAllNurses = {
        label: "Liste de tous les infirmiers",
        action: this.displayAllNurses
    };
    this.displayOfficeInfos = {
        label: "Informations sur le cabinet",
        action: this.displayOfficeInformations
    };
}


/**
 * Afficher les informations du le cabinet
 * 
 * @param {type} ctrl
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuElements.prototype.displayOfficeInformations = function (ctrl, ownerElement) {

// afficher les informations
    ctrl.displaySection(ownerElement);
};
/**
 * Afficher le formulaire de recherche de patients
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuElements.prototype.displaySearch = function (ctrl, ownerElement) {

    // afficher les informations
    ctrl.displaySection(ownerElement);
};
/**
 * Afficher tous les patients dans l'espace de travail
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuElements.prototype.displayAllPatients = function (ctrl, ownerElement) {

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
MenuElements.prototype.displayAllNurses = function (ctrl, ownerElement) {

    // mettre à jour les patients
    ctrl.updateNurses();
    // afficher la section de page, avant l'arrivée des données
    ctrl.displaySection(ownerElement);
};
/**
 * Afficher tous les patients dans l'espace de travail
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuElements.prototype.displayNonAffectedPatients = function (ctrl, ownerElement) {

    // mettre à jour les patients
    ctrl.updateNonAffectedPatients();
    // afficher la section de page, avant l'arrivée des données
    ctrl.displaySection(ownerElement);
};
/**
 * Afficher le formulaire d'ajout de patient
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuElements.prototype.displayAddPatientForm = function (ctrl, ownerElement) {

    // afficher la section de page, avant l'arrivée des données
    ctrl.displaySection(ownerElement);
};
/**
 * Afficher le formulaire d'ajout de patient
 * @param {type} ownerElement
 * @returns {undefined}
 */
MenuElements.prototype.showController = function (ctrl, ownerElement) {

    // afficher la section de page, avant l'arrivée des données
    ctrl.displaySection(ownerElement);
};
module.exports = new MenuElements();
