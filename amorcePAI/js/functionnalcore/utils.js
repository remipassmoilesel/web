
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

module.exports = new Utils();

