const multiply_divide = require('../multiply_divide');
const denominator = require('../../math/base/denominator');

/**
 * 加减
 * @param {String} expression 公式
 */
module.exports = function plus_subtract(expression) {
	var expres = expression.replace(/\^\-/g, '^~');
	expres = expres.replace(/ /g, '').replace(/\+/g, ' +').replace(/\-/g, ' -');
	expres = expres.replace(/\^~/g, '^-');
	var arr = expres.split(' ');

	var dict = {};
	var exp = "";
	var num = 0;

	var multiply = 0;
	var divide = 1;

	var multiply_str = "";
	var divide_str = "";

	// 统计代数个数
	arr.map(function(x) {
		var exp = "";

		if (x.indexOf('-') === 0) {
			exp = " -" + multiply_divide(x.replace('-', '')) + "";
		} else {
			if (x.indexOf('+') === 0) {
				exp = x.replace('+', '');
			} else {
				exp = x;
			}
			exp = multiply_divide(exp) + "";
		}
		if (/[a-zA-Z]/.test(exp)) {
			if (exp.indexOf(' -') === 0) {
				if (exp.indexOf('^') !== -1 || exp.indexOf('/') !== -1) {
					var key = exp.replace(' -', '');
					// 代数加减
					if (!dict[key]) {
						dict[key] = -1;
					} else {
						dict[key] -= 1;
					}
				} else {
					var key = exp.match(/[a-zA-Z]+/)[0];
					var str = exp.replace(key, '');
					var n = 1;
					if(str)
					{
						if(str.trim() == '-')
						{
							n = -1;
						}
						else {
							n = Number(str);
						}
					}
					// 代数加减
					if (!dict[key]) {
						dict[key] = n;
					} else {
						dict[key] += n;
					}
				}
			} else {
				if (exp.indexOf('^') !== -1 || exp.indexOf('/') !== -1) {
					var key = exp;
					// 代数加减
					if (!dict[key]) {
						dict[key] = 1;
					} else {
						dict[key] += 1;
					}
				} else {
					var key = exp.match(/[a-zA-Z]+/)[0];
					var str = exp.replace(key, '');
					var n = 1;
					if(str)
					{
						if(str.trim() == '-')
						{
							n = -1;
						}
						else {
							n = Number(str);
						}
					}
					// 代数加减
					if (!dict[key]) {
						dict[key] = n;
					} else {
						dict[key] += n;
					}
				}
			}
		} else {
			// 代数加减
			if (exp.indexOf("^") !== -1) {
				var mh = exp.match(/[0-9]+\^[0-9]+/);
				if (mh) {
					var key = mh[0];
					var left = key.left("^");
					var ex = "";
					var right = key.right("^");
					var n = Number(right);
					for (var i = 0; i < n; i++) {
						ex += " * (" + left + ")";
					}
					var value = eval(ex.replace(' * ', ''));
					exp = exp.replace(key, value);
				}
			}
			if (exp.indexOf("/") !== -1) {
				var left = exp.left("/");
				var right = exp.right("/");
				var d = Number(right);
				multiply = Number(left) * divide + multiply * d;
				divide *= d;
			} else {
				num += Number(exp);
			}
		}
	});

	var result = '';
	// 合并公式
	for (var k in dict) {
		var val = dict[k];
		if (val === 1) {
			result += ' +' + k
		} else if (val !== 0) {
			if (val > 0) {
				result += ' +' + val + k
			} else {
				if (-val === 1) {
					result += ' -' + k
				} else {
					result += val + k
				}
			}
		}
	}
	if (num > 0) {
		result += ' +' + num
	} else if (num < 0) {
		result += num
	}
	if (multiply !== 0) {
		var o = denominator(multiply, divide);
		result += " +" + o.multiply + '/' + o.divide;
	}
	if (result.indexOf(' +') === 0) {
		result = result.replace(' +', '');
	}
	return result.replace(/\+ \-/g, ' -');
};
