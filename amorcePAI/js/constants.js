/**
 * Retourne un objet contenant des constantes ou des variables de configuration.
 * Les scripts et les ressources sont référencées ici pour faciliter les modifications.
 */
module.exports = {
    /*
     * Les emplacements des différents fichiers de données, relatifs à la racine du projet
     */
    dataActions: "data/actes.xml",
    dataOffice: "data/cabinetInfirmier.xml",
    /*
     * Noms de services enregistrés dans angular
     */
    serviceDataHandler: "datahandler",
    /*
     * Expressions régulières courantes
     */
    patientInformationPattern: '^ *[a-zA-Z éàï-]+ *$',
    /*
     * Exceptions. Stocker les exceptions en tant que constante permet de faire 
     * des récupération fines d'exception avec des tests (ex: e === NO_PATIENT_DEFINED)
     */
    NO_PATIENT_DEFINED: "NO_PATIENT_DEFINED",
    INVALID_ARGUMENT: "INVALID_ARGUMENT",
    /**
     * Afficher toutes les constantes et leurs types, hors fonctions.
     * @returns {undefined}
     */
    logAll: function () {
        console.log("Constantes: ");
        for (var property in this) {
            if (typeof this[property] !== "function") {
                console.log("\t - " + property + ": " + this[property] + " - " + (typeof this[property]));
            }
        }
    }
};
