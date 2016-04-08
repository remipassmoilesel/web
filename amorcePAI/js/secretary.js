
// feuille de style principale
require("../css/secretary.css");

// Chargement d'angular
var angular = require("angular");
// Elements d'interface
var angularMaterial = require("angular-material");
require("angular-material/angular-material.css");
// Messages d'erreur pour champs input
var angularMessages = require("angular-messages");

// déclarer un module pour le cabinet médical, avec comme dépendance angular-material
var officeModule = angular.module("officeModule", [angularMaterial, 'ngMessages']);

// définir le composant cabinet medical
require("./components/medicalOffice/medicalOffice-component.js")(officeModule);

// définir le composant infirmier
require("./components/nurse/nurse-component.js")(officeModule);

// définir le composant patient
require("./components/patient/patient-component.js")(officeModule);

// définir le composant patient
require("./components/formNewPatient/formNewPatient-component.js")(officeModule);

