
// feuille de style principale
require("../css/secretary.css");

// Chargement d'angular
var angular = require("angular");

// Elements d'interface
var angularMaterial = require("angular-material");
require("angular-material/angular-material.css");

// Messages d'erreur pour champs input
require("angular-messages");

// Transition douces animées
require("angular-animate");

// déclarer un module pour le cabinet médical, avec comme dépendance angular-material
var officeModule = angular.module("officeModule", [angularMaterial, 'ngMessages', 'ngAnimate']);

// enregistrer le service de traitement des données
require("./functionnalcore/datahandler.js")(officeModule);

// définir le composant cabinet medical
require("./components/medicalOffice/medicalOffice-component.js")(officeModule);

// définir le composant infirmier
require("./components/nurse/nurse-component.js")(officeModule);

// définir le composant patient
require("./components/patient/patient-component.js")(officeModule);

// définir le composant patient
require("./components/formPatient/formPatient-component.js")(officeModule);

// affichage d'informations sur le cabinet
require("./components/displayOfficeInformations/displayOfficeInformations-component.js")(officeModule);

// affichage d'informations sur le cabinet
require("./components/jsonPrettyPrint/jsonPrettyPrint-component.js")(officeModule);

// recherche de patients
require("./components/searchPatientForm/searchPatientForm-component.js")(officeModule);
