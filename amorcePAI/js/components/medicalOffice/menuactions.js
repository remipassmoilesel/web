
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
    ctrl.updateNurses();

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
    ctrl.updateNonAffectedPatients();

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

module.exports = new MenuActions();
