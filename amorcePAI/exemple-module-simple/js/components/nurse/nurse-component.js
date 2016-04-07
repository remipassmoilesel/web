var template = require('./nurse-template.html');
require('./nurse-component.css');

module.exports = function (angularMod) {

    var Controller = function () {
        
    };

    angularMod.component("nurse", {
        template: template,
        bindings: {
            data: "<"
        },
        controller: Controller
    });
};
