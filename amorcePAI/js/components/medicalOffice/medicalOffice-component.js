var template = require('./medicalOffice-template.html');
require('./medicalOffice-component.css');

module.exports = function (angularMod) {

    var datahandler = require("../../functionnalcore/datahandler.js")(angularMod);

    var Controller = function (datah, $scope) {

        // faire référence à self pour avoir un this correct dans la fonction suivante
        var self = this;
        
        // récupérer les informations du cabinet en asynchrone
        datah.getOfficeInformations().then(function (response) {
            self.informations = response;
            // si pas d'utilisation des promesses angular, via les méthodes http et tout ça, mettre à jour angular 
            // en appelant cette méthode
            $scope.$apply();
        });
        
        // récupérer les infirmiers du cabinet en asynchrone
        datah.getNurses().then(function (response) {
            self.nurses = response;
            // si pas d'utilisation des promesses angular, via les méthodes http et tout ça, mettre à jour angular 
            // en appelant cette méthode
            $scope.$apply();
        });
        

    };

    // injection de dépendance sous forme d'un tableau de chaine de caractères
    Controller.$inject = [datahandler, "$scope"];

    angularMod.component("medicalOffice", {
        template: template,
        controller: Controller
    });
};
