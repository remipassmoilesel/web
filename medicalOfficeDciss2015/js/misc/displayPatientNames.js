
require("./secretary.css");
var utils = require("./utils.js");

var req = utils.XHR('GET', 'data/cabinetInfirmier.xml');

req.then(function (xhr) {

    //console.log(req);
    //console.log(xhr);

    // récupérer le xml brut
    var rawDoc = xhr.response;

    // parser le xml
    var parser = new DOMParser();
    var doc = parser.parseFromString(rawDoc, "application/xml");

    // afficher le xml
    //console.log(doc);

    // récupérer les patients
    var patients = doc.documentElement.getElementsByTagName("patient");
    //console.log(patients);

    var displayArea = document.getElementById("playground");

    displayArea.innerHTML += "Liste des patients: <br/>";


    for (var i = 0; i < patients.length; i++) {
        var p = patients[i];
        console.log(p.querySelector("nom").textContent);

        displayArea.innerHTML += p.querySelector("nom").textContent + "<br/>";

    }


});
