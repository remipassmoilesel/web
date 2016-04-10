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
                            adressComplete: self.agregate(xmlDoc
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
                            var tmp;
                            var patientObj = {
                                name: patientTag.querySelector("nom").innerHTML,
                                firstname: patientTag.querySelector("prenom").innerHTML,
                                gender: patientTag.querySelector("sexe").innerHTML,
                                birthdate: patientTag.querySelector("naissance").innerHTML,
                                ssid: patientTag.querySelector("numero").innerHTML,
                                adressComplete: self.agregate(xmlDoc
                                        , "adresse numero"
                                        , "adresse rue"
                                        , "adresse codePostal"
                                        , "adresse ville"),
                                adressNumber: (tmp = patientTag.querySelector("adresse numero")) !== null ? tmp.innerHTML : '',
                                adressStreet: (tmp = patientTag.querySelector("adresse rue")) !== null ? tmp.innerHTML : '',
                                adressPostcode: (tmp = patientTag.querySelector("adresse codePostal")) !== null ? tmp.innerHTML : '',
                                adressCity: (tmp = patientTag.querySelector("adresse ville")) !== null ? tmp.innerHTML : '',
                                adressFloor: (tmp = patientTag.querySelector("adresse etage")) !== null ? tmp.innerHTML : ''
                            };

                            // calcul de l'age
                            var dateParts = patientObj.birthdate.split("-");
                            patientObj.age = ((new Date().getTime() 
                                    - new Date(dateParts[2], dateParts[1], 
                                    dateParts[0]).getTime()) / 31536000000).toFixed(0);

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
 * Ajoute un patient et retourne la promesse de la requête
 * @param {type} patient
 * @returns {unresolved}
 */
DataHandler.prototype.addPatient = function (patient) {

    if (typeof patient === "undefined") {
        throw constants.NO_PATIENT_DEFINED;
    }

    /*
     Informations requises coté serveur
     req.body.patientName = req.body.patientName || '';
     req.body.patientForname = req.body.patientForname || '';
     req.body.patientNumber = req.body.patientNumber || '';
     req.body.patientSex = req.body.patientSex || '';
     req.body.patientBirthday = req.body.patientBirthday || '';
     req.body.patientFloor = req.body.patientFloor || '';
     req.body.patientStreet = req.body.patientStreet || '';
     req.body.patientPostalCode = req.body.patientPostalCode || '';
     req.body.patientCity = req.body.patientCity || '';
     req.body.patientAdressNumber = req.body.patientAdressNumber || '';
     */

    /*
     // Structure d'un objet patient coté client
     var patientObj = {
     name: patientTag.querySelector("nom").innerHTML,
     firstname: patientTag.querySelector("prenom").innerHTML,
     gender: patientTag.querySelector("sexe").innerHTML,
     birthdate: patientTag.querySelector("naissance").innerHTML,
     ssid: patientTag.querySelector("numero").innerHTML,
     adressComplete: self.agregate(xmlDoc
     , "adresse numero"
     , "adresse rue"
     , "adresse codePostal"
     , "adresse ville"),
     adressNumber: patientTag.querySelector("adresse numero").innerHTML,
     adressStreet: patientTag.querySelector("adresse rue").innerHTML,
     adressPostcode: patientTag.querySelector("adresse codePostal").innerHTML,
     adressCity: patientTag.querySelector("adresse ville").innerHTML,
     adressFloor: patientTag.querySelector("adresse etage").innerHTML
     };
     */
    var dataToSend = {
        patientName: patient.name || '',
        patientForname: patient.firstname || '',
        patientSex: patient.gender || '',
        patientBirthday: patient.birthdate || '',
        patientNumber: patient.ssid || '',
        patientStreet: patient.adressStreet || '',
        patientPostalCode: patient.adressPostcode || '',
        patientCity: patient.adressCity,
        patientFloor: patient.adressFloor || '',
        patientAdressNumber: patient.adressNumber || ''
    };

    return this.$http.post("/addPatient", dataToSend);

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

/**
 * Renvoi une promesse qui retourne un tableaux de patient correspondant aux critères en argument
 * @returns {Promise}
 */
DataHandler.prototype.searchPatients = function (wanted) {

    return this.getAllPatients().then(function (patients) {

        var output = [];

        // itérer les patients
        for (var i = 0; i < patients.length; i++) {
            var p = patients[i];

            /*
             * Utilisation d'une méthode simplifiée (pt trop ?) pour tester les patients. 
             * Les critéres à comparer sont inséré dans deux tableaux aux mêmes indices.
             * Si les critères sont non-vide ils sont comparés entre eux
             */
            var testsPartA = [];
            var testsPartB = [];

            // nom
            testsPartA.push((wanted.name || '').toLocaleLowerCase());
            testsPartB.push((p.name || '').toLocaleLowerCase());

            // prénom
            testsPartA.push((wanted.firstname || '').toLocaleLowerCase());
            testsPartB.push((p.firstname || '').toLocaleLowerCase());

            // iterer les tests
            for (var j = 0; j < testsPartA.length; j++) {
                var a = testsPartA[j];
                var b = testsPartB[j];

                // verifier que les parties ne soient pas vides
                if (a.length > 0 && b.length > 0) {

                    // test
                    if (a.includes(b) || b.includes(a)) {
                        output.push(p);
                        break;
                    }
                }
            }
        }

        return output;
    });

};


module.exports = function (angularMod) {
    var id = constants.serviceDataHandler;
    angularMod.service(id, DataHandler);
    return id;
};