var template = require('./medicalOffice-template.html');
require('./medicalOffice-component.css');

module.exports = function (angularMod) {

    var Controller = function (datah) {

        // faire référence à self pour avoir un this correct dans la fonction suivante
        var vm = this;

        datah.getOfficeInformations().then(function (response) {
            vm.informations = response;
        });

        datah.getNurses().then(function (response) {
            vm.nurses = response;
        });

        datah.getAllPatients().then(function (response) {
            vm.allPatients = response;
        });

        datah.getNonAffectedPatients().then(function (response) {
            vm.nonAffectedPatients = response;
        });

    };

    // injection de dépendance sous forme d'un tableau de chaine de caractères
    var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);
    Controller.$inject = [datahandler];

    // création du composant
    angularMod.component("medicalOffice", {
        template: template,
        controller: Controller
    });
};
