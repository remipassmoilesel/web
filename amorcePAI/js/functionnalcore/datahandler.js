/**
 * 
 * Equivalent renommé du Noyau Fonctionnel du TP. Permet de manipuler 
 * les données (consultation et modification)
 * 
 * La fonction asyncXmlParse est juste une fonction utilitaire qui permet de 
 * réduire un peu le code.
 * 
 */


var constants = require("../constants.js");

/**
 * Fonction utilitaire permettant d'harmoniser le code des promesses pour les différentes extractions XML
 * 
 * @param {type} $http
 * @param {type} dataLocation
 * @param {type} callbackThen
 * @param {type} callbackError
 * @returns {Promise}
 */
function asyncXmlParse($http, dataLocation, callbackThen, callbackError) {

    // appel asynchrone des données
    return $http.get(dataLocation)

            // appel réussi
            .then(function (response) {

                // parser les données
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(response.data, "text/xml");

                // terminer la promesse
                return callbackThen(xmlDoc);
            })

            // erreur lors de la promesse, appel de callback uniquement si est défini comme une fonction
            .catch(function (response) {
                if (typeof callbackError === "function") {
                    return callbackError(response);
                }
            });

}

var DataHandler = function ($http) {
    this.$http = $http;
};
// Injection de dépendances
DataHandler.$inject = ["$http"];

/**
 * Renvoi une promesse qui returne un objet contenant toutes les informations du cabinet
 * @returns {Promise}
 */
DataHandler.prototype.getOfficeInformations = function () {

    return asyncXmlParse(
            this.$http,
            // document à parser
            constants.dataOffice,
            // cb en cas de succès
                    function (xmlDoc) {
                        // iterer et formatter les infirmiers
                        return {
                            name: xmlDoc.querySelector("cabinet nom").innerHTML,
                            adress:
                                    xmlDoc.querySelector("cabinet adresse numero").innerHTML
                                    + " " + xmlDoc.querySelector("cabinet adresse rue").innerHTML
                                    + " " + xmlDoc.querySelector("cabinet adresse ville").innerHTML
                                    + " " + xmlDoc.querySelector("cabinet adresse codePostal").innerHTML
                        };
                    });
        };

/**
 * Renvoi une promesse qui retourne un tableaux d'objet sur les infirmiers
 * @returns {Promise}
 */
DataHandler.prototype.getNurses = function () {

    return asyncXmlParse(
            this.$http,
            // document à parser
            constants.dataOffice,
            // cb en cas de succès
                    function (xmlDoc) {

                        var output = [];
                        var nurseTags = xmlDoc.querySelector("infirmiers").getElementsByTagName("infirmier");

                        for (var i = 0; i < nurseTags.length; i++) {
                            var tag = nurseTags[i];
                            output.push({
                                name: tag.querySelector("nom").innerHTML,
                                firstname: tag.querySelector("prenom").innerHTML,
                                imagePath: tag.querySelector("photo").innerHTML,
                                id: tag.getAttribute("id")
                            });
                        }

                        return output;
                    });
        };

/**
 * Renvoi une promesse qui retourne un tableaux d'objet sur les infirmiers
 * @returns {Promise}
 */
DataHandler.prototype.getPatients = function () {

    return asyncXmlParse(
            this.$http,
            // document à parser
            constants.dataOffice,
            // cb en cas de succès
                    function (xmlDoc) {

                        var output = [];
                        var nurseTags = xmlDoc.querySelector("infirmiers").getElementsByTagName("infirmier");

                        for (var i = 0; i < nurseTags.length; i++) {
                            var tag = nurseTags[i];
                            output.push({
                                name: tag.querySelector("nom").innerHTML,
                                firstname: tag.querySelector("prenom").innerHTML,
                                photo: tag.querySelector("photo").innerHTML
                            });
                        }

                        return output;
                    });
        };

module.exports = function (angularMod) {
    var id = "functionnalCore";
    angularMod.service(id, DataHandler);
    return id;
};