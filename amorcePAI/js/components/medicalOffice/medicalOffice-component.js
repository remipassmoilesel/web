var template = require('./medicalOffice-template.html');
require('./medicalOffice-component.css');

module.exports = function (angularMod) {

    var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);

    var Controller = function (datah, $scope) {

        // faire référence à self pour avoir un this correct dans la fonction suivante
        var vm = this;

        datah.getOfficeInformations().then(function (response){
            vm.informations = response;
        });
        
        datah.getNurses().then(function (response){
            vm.nurses = response;
        });
        
        datah.getPatients().then(function (response){
            vm.patients = response;
        });

    };

    // injection de dépendance sous forme d'un tableau de chaine de caractères
    Controller.$inject = [datahandler, "$scope"];

    angularMod.component("medicalOffice", {
        template: template,
        controller: Controller
    });
};
