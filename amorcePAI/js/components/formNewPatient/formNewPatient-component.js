var template = require('./formNewPatient-template.html');
require('./formNewPatient-component.css');

module.exports = function (angularMod) {

    var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);

    var Controller = function ($http, datah) {

        // conserver la référence pour requêtes
        this.$http = $http;
        this.datah = datah;

        this.patientNamePattern = "/^ *[a-zA-Z-]+ *$/";

        // faire référence à self pour avoir un this correct dans la fonction suivante
        this.patient = {
            firstname: "",
            name: "",
            nurse: ""
        };

    };
    // injection de dépendance sous forme d'un tableau de chaine de caractères
    Controller.$inject = ["$http", datahandler];


    Controller.prototype.addPatient = function () {

        //console.log("Ajout de : " + this.patient);

        // vérfier le nom et le prénom 


    };


    angularMod.component("formNewPatient", {
        template: template,
        controller: Controller,
        bindings: {
        }
    });
};
