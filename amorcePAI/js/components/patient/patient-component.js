var template = require('./patient-template.html');
require('./patient-component.css');

module.exports = function (angularMod) {

    var Controller = function () {
        
    };

    angularMod.component("patient", {
        template: template,
        bindings: {
            data: "<"
        },
        controller: Controller
    });
};
