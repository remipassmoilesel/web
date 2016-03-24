/*
 * Exemple de module webpack
 */

function ModuleExample() {
    this.value = "Value";
}

ModuleExample.prototype.doSomething = function (str) {
    document.alert("Something !" + str);
};

module.exports = new ModuleExample();

