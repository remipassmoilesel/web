
var constants = require("../constants.js");

/**
 * Fonction utilitaire permettant d'harmoniser le code des promesses pour les différentes extractions XML
 * 
 * @param {type} $http
 * @param {type} docLocation
 * @param {type} callbackSuccess
 * @param {type} callbackError
 * @returns {Promise}
 */
function asyncXmlParse($http, docLocation, callbackSuccess, callbackError) {

    // appel asynchrone des données
    return $http.get(docLocation)

            // appel réussi
            .then(function (response) {

                // parser les données
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(response.data, "text/xml");

                // terminer la promesse
                return callbackSuccess(xmlDoc);
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
                                imagePath: tag.querySelector("photo").innerHTML
                            });
                        }

                        return output;
                    });
        };

/**
 * Renvoi une promesse qui retourne un tableaux d'objet sur les infirmiers
 * @returns {Promise}
 */
DataHandler.prototype.getPatient = function () {

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