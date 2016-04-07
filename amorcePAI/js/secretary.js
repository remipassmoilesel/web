
// feuille de style principale
require("../css/secretary.css");

// chargement d'angular
var angular = require("angular");
var angularMaterial = require("angular-material");
require("angular-material/angular-material.css");

// déclarer un module pour le cabinet médical, avec comme dépendance angular-material
var officeModule = angular.module( "officeModule", [ angularMaterial ] );

// définir le composant cabinet medical
require("./components/medicalOffice/medicalOffice-component.js")(officeModule);

// définir le composant infirmier
require("./components/nurse/nurse-component.js")(officeModule);

// définir le composant patient
require("./components/patient/patient-component.js")(officeModule);

