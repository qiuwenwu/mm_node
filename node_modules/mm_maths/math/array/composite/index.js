function isComposite(n) {
	if (n == 0 || n == 1) {
		return false;
	}
	if (n == 2) {
		return false;
	}
	var times = Math.sqrt(n);
	if (times == parseInt(times)) {
		return true;
	}
	for (var i = 2; i < times; i++) {
		if (n % i == 0) {
			return true;
		}
	}
	return false;
}

/**
 * 取所有合数
 * @param {Array} arr 数组
 * @return {Array} 返回合数集合
 */
module.exports = function composite(arr) {
	var arr_new = [];
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		var n = arr[i];
		if (isComposite(n)) {
			arr_new.push(n);
		}
	}
	return arr_new;
};
