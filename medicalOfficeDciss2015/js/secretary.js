
// feuille de style principale
require("../css/secretary.css");

// chargement d'angular
var angular = require("angular");
var angularMaterial = require("angular-material");
require("angular-material/angular-material.css");

// créer un module d'affichage des patients
var allPatientsModule = angular.module("displayAllPatients", [angularMaterial]);
require('./angular-components/displayAllPatients.js')(allPatientsModule);

