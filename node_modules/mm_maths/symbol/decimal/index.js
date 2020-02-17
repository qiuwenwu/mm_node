const denominator = require('../../math/base/denominator');

/**
 * 输入小数, 转成分数
 * @param {number} val 值 或 公式
 * @return {number} 返回分数值或分数式
 */
module.exports = function decimal(val) {
	var arr = val.match(/[0-9]+\.[0-9]+/g);
	if (arr) {
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var o = arr[i];
			if (o) {
				var index = o.indexOf('.');
				var len = o.length;
				var integer = Number(o.substring(0, index));
				var d = o.substring(index + 1, len);
				var decimal = Number(d);
				if(decimal === 0){
					val = val.replace(o, integer);
				}
				else {
					var n = Math.pow(10, d.length);
					var {
						multiply,
						divide
					} = denominator(decimal, n);
					var exp = multiply + '/' + divide;
					if(integer === 0){
						val = val.replace(o, exp);
					}
					else {
						val = val.replace(o, integer + ' +' + exp);
					}
				}
			}
		}
	}
	return val;
};
