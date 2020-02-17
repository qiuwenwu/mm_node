/**
 * 圆周率
 * @param {number} 数值或公式
 * @return {number} 返回数值
 */
module.exports = function PI(val) {
	var arr = val.match(/([0-9]+\.)?[0-9]+π/g);
	if (arr) {
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var o = arr[i];
			if (o) {
				var v = o.replace('π', '');
				v = (Number(v) * Math.PI) + '';
				val = val.replace(o, v);
			}
		}
	}
	return val;
};
