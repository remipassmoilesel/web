/**
 * Fichier contenant des constantes ou des variables de configuration
 */
module.exports = {
    /*
     * Les différents fichiers de données
     */
    dataActes: "./data/actes.xml",
    dataCabinet: "./data/cabinetInfirmier.xml",
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
