
// Imports
// var angular = require('angular');
var consts = require('./constants.js')

function DataHandler() {
    console.log("Création d'un objet DataHandler");
    console.log("Fichiers de données: " + consts.dataActions + ", " + consts.dataNurses + ", ...");

}

DataHandler.prototype.getNurses = function () {
    return ['Annie', 'Claudette', 'Jean'];
};

DataHandler.prototype.getActions = function () {
    return ['Piqure', 'Fessée', 'Divers'];
};

DataHandler.prototype.getPatients = function () {
    return ['Victor', 'Claudio', 'Jules'];
};

module.exports = new DataHandler();



