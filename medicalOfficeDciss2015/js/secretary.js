
// feuille de style principale
require("../css/secretary.css");

// chargement d'angular et angularMaterials
var angular = require("angular");
var angularMaterial = require("angular-material");
require("angular-material/angular-material.css");

// créer un module d'affichage des patients
var allPatientsModule = angular.module("allPatientsModule", [angularMaterial]);
require('./angular-components/allPatientsModule.js')(allPatientsModule);
