// chargement d'angular
var angular = require("angular");
var angularMaterial = require("angular-material");
require("angular-material/angular-material.css");

// créer un module angular
var newModule = angular.module("newModuleAppName", [angularMaterial]);

// récupérer le template et le stocker 
var template = require("./componentTemplate.html");

// Controlleur instancié à la création du composant
var controller = function () {
    console.log("Nouveau controlleur créé !");
    this.title = "Nouveau titre";
};

// Créer un nouveau composant (camel case obligatoire)
newModule.component("newModuleTagName", {
    template: template,
    bindings: {},
    controller: controller
});



