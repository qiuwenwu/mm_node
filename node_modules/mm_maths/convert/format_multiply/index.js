/**
 * 公式的乘法格式化
 * @param {String} expression
 * @return {String} 返回格式化后的公式
 */
module.exports = function format_multiply(expression) {
	var exp = expression.replace(/\^\-/g, '^@');
	exp = exp.replace(/\*/g, ' *').replace(/\//g, ' /');
	exp = exp.replace(/\^@/g, '^-');
	if (/[a-zA-Z]/.test(exp)) {
		var left = "";
		var between = "";
		var right = "";
		var value = "";
		var vals = exp.split(' ');
		var len = vals.length;
		for (var i = 0; i < len; i++) {
			var val = vals[i];
			if (/[a-zA-Z]/.test(val)) {
				if (val.indexOf('/') === -1) {
					left += ' ' + val;
				} else {
					between += ' ' + val;
				}
			} else {
				var k = val.replace(/\+/g, '').replace(/\-/g, '').replace(/\*/g, '');
				if (/^[0-9.]+$/.test(k)) {
					value += ' ' + val;
				} else {
					right += ' ' + val;
				}
			}
		}
		exp = left + ' *' + between + ' *' + right;
		if (value) {
			exp += ' *' + eval((1 + '*' + value).replace('* *', '*').replace('* /', '/'));
		}
	}
	return exp.replace('* *', '*').replace('* *', '*').replace('* /', '/').replace('* /', '/');
};
