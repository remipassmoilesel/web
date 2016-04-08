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

var DataHandler = function ($http) {
    this.$http = $http;
};
// Injection de dépendances
DataHandler.$inject = ["$http"];

/**
 * Fonction utilitaire permettant d'harmoniser le code des promesses pour les différentes extractions XML
 * 
 * @param {type} $http
 * @param {type} dataLocation
 * @param {type} callbackThen
 * @param {type} callbackError
 * @returns {Promise}
 */
DataHandler.prototype.asyncXmlParse = function (dataLocation, callbackThen, callbackError) {

    // appel asynchrone des données
    return this.$http.get(dataLocation)

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

};

/**
 * Méthode utilitaire permettant d'gréger le contenu de plusieurs balises XML
 * @param {type} domElement
 * @returns {DataHandler.prototype.agregate.output|String}
 */
DataHandler.prototype.agregate = function (domElement) {

    var output = "";

    for (var i = 1; i < arguments.length; i++) {
        var sel = arguments[i];
        try {
            output += domElement.querySelector(sel).innerHTML + " ";
        } catch (err) {
            console.log("Error while agregating: " + err);
        }
    }

    return output;
}

/**
 * Renvoi une promesse qui returne un objet contenant toutes les informations du cabinet
 * @returns {Promise}
 */
DataHandler.prototype.getOfficeInformations = function () {

    var self = this;
    return this.asyncXmlParse(
            // document à parser
            constants.dataOffice,
            // cb en cas de succès
                    function (xmlDoc) {
                        // iterer et formatter les infirmiers
                        return {
                            name: xmlDoc.querySelector("cabinet nom").innerHTML,
                            completeAdress: self.agregate(xmlDoc
                                    , "cabinet adresse numero"
                                    , "cabinet adresse rue"
                                    , "cabinet adresse ville"
                                    , "cabinet adresse codePostal")
                        };
                    });
        };

/**
 * Renvoi une promesse qui retourne un tableaux d'objet sur les infirmiers
 * @returns {Promise}
 */
DataHandler.prototype.getNurses = function () {

    return this.asyncXmlParse(
            // document à parser
            constants.dataOffice,
            // cb en cas de succès
                    function (xmlDoc) {

                        var output = [];
                        var nurseTags = xmlDoc.querySelector("infirmiers").getElementsByTagName("infirmier");

                        // récupérer les informations sur les infirmiers
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
 * Renvoi une promesse qui retourne un tableaux d'objet sur les patients
 * @returns {Promise}
 */
DataHandler.prototype.getAllPatients = function () {

    var self = this;
    return this.asyncXmlParse(
            // document à parser
            constants.dataOffice,
            // cb en cas de succès
                    function (xmlDoc) {

                        var output = [];
                        var patientTagArray = xmlDoc.querySelector("patients").getElementsByTagName("patient");

                        // itérer les patients
                        for (var i = 0; i < patientTagArray.length; i++) {
                            var patientTag = patientTagArray[i];

                            // récuperer les informations sur le patient
                            var patientObj = {
                                name: patientTag.querySelector("nom").innerHTML,
                                firstname: patientTag.querySelector("prenom").innerHTML,
                                gender: patientTag.querySelector("sexe").innerHTML,
                                birthdate: patientTag.querySelector("naissance").innerHTML,
                                ssid: patientTag.querySelector("numero").innerHTML,
                                completeAdress: self.agregate(xmlDoc
                                        , "adresse numero"
                                        , "adresse rue"
                                        , "adresse codePostal"
                                        , "adresse ville")
                            };

                            // itérer les visites par patient
                            patientObj.visits = [];
                            var visitTagArray = patientTag.getElementsByTagName("visite");
                            for (var j = 0; j < visitTagArray.length; j++) {
                                var visitTag = visitTagArray[j];

                                // récuperer les informations sur la visite
                                var visitObj = {
                                    date: visitTag.getAttribute("date"),
                                    idNurse: visitTag.getAttribute("intervenant")
                                };

                                // itérer les actes médicaux
                                visitObj.actions = [];
                                var actionTagArray = visitTag.getElementsByTagName("acte");
                                for (var k = 0; k < actionTagArray.length; k++) {
                                    var actionTag = actionTagArray[k];

                                    visitObj.actions.push(actionTag.getAttribute("id"));
                                }

                                // ajout de la visite à l'objet patient
                                patientObj.visits.push(visitObj);

                            }

                            // ajout du patient à l'objet exporté
                            output.push(patientObj);
                        }

                        return output;
                    });
        };

/**
 * Renvoi une promesse qui retourne un tableaux d'objet sur les patients sans infirmiers
 * @returns {Promise}
 */
DataHandler.prototype.getNonAffectedPatients = function () {

    return this.getAllPatients().then(function (patients) {
        
        var output = [];
        for (var i = 0; i < patients.length; i++) {
            var pat = patients[i];
            if (pat.visits.length === 0) {
                output.push(pat);
            }
        }
        
        return output;
    });

};


module.exports = function (angularMod) {
    var id = "functionnalCore";
    angularMod.service(id, DataHandler);
    return id;
};