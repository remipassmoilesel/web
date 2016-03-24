
var proxyNF = function ($http) {
    // Utilisez $http pour télécharger la base de données
    $http.get("data/cabinetInfirmier.xml")
            .then(function (response) {
                console.log(response);
            });
};

proxyNF.$inject = ["$http"]; // Injection de dépendances

/**
 * Attend un module en parametre puis créé un NF si nécéssaire et
 *  l'enregistre comme service dans le module
 * @param {type} mod
 * @returns {module.exports.id|String}
 */
module.exports = function (mod) {
    var id = "proxyNF";

    // enregistre la fonction ci-dessus comme service avec comme id proxyNF
    mod.service(id, proxyNF);

    return id;
};


