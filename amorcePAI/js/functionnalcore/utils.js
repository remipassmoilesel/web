
function Utils() {

}

/**
 * Retourne une date formattée sous la forme dd/mm/yyyy
 * @param {type} date
 * @returns {String|Utils.prototype.getPrettyDate.sep}
 */
Utils.prototype.getPrettyDate = function (date) {

    var sep = "/";

    if (typeof date === "undefined") {
        date = new Date();
    }

    return date.getDate()
            + sep + date.getMonth()
            + sep + date.getFullYear();

};

/**
 * Conversion de date à partir du format YYYY-MM-DD
 * @param {type} stringDate
 * @returns {undefined}
 */
Utils.prototype.stringToDateObject = function (stringDate) {
    return new Date(stringDate.trim());
};

/**
 * Conversion de date vers le format YYYY-MM-DD
 * @param {type} stringDate
 * @returns {undefined}
 */
Utils.prototype.dateObjectToString = function (objectDate) {
    return objectDate.toISOString().substr(0, 10);
};

module.exports = new Utils();

