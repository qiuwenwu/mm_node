const multiply_divide = require('../multiply_divide');
const plus_subtract = require('../plus_subtract');

const decimal = require('../../symbol/decimal');
const percentage = require('../../symbol/percentage');

/**
 * @description 四则运算
 * @param {String} expression 公式
 */
module.exports = function four_run(expression) {
	var express = decimal(expression);
	express = percentage(express);
	express = plus_subtract(express);
	express = express.replace(/\^\-/g, '^@').replace(/\+/g, '+ ').replace(/\-/g, '- ').replace(/\^@/g, '^-');
	if(express.indexOf('- ') == 0){
		express = express.replace('- ', '-')
	}
	return express;
}