const Static = require('../com/static').Static;
$.static = new Static();
$.static.update();

module.exports = $.static.run;