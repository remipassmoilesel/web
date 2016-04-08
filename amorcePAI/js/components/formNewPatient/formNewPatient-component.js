var template = require('./formNewPatient-template.html');
require('./formNewPatient-component.css');

module.exports = function (angularMod) {

    var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);

    var Controller = function ($http, datah) {

        // conserver les références des services
        this.$http = $http;
        this.datah = datah;

        // pattern affectant les champs de texte
        this.patientInfoPattern = '^ *[a-zA-Z -]+ *$';

        // dates utiles
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDay() - 1);
        this.lowestDate = new Date(1900, 01, 01);
        this.highestDate = new Date();

        
        
        this.patient = {
            firstname: "Prénom",
            name: "Nom",
            nurse: "id",
            gender: "A",
            birthdate: yesterday
        };

    };
    // injection de dépendance sous forme d'un tableau de chaine de caractères
    Controller.$inject = ["$http", datahandler];


    Controller.prototype.addPatient = function () {

        console.log("Ajout de : " + this.patient);

        

        // vérfier le nom et le prénom 


    };


    angularMod.component("formNewPatient", {
        template: template,
        controller: Controller,
        bindings: {
        }
    });
};
