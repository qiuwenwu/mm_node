function isPrinme(n) {
	if (n == 0 || n == 1) {
		return false;
	}
	if (n == 2) {
		return true;
	}
	var times = Math.sqrt(n);
	if (times == parseInt(times)) {
		return false;
	}
	for (var i = 2; i < times; i++) {
		if (n % i == 0) {
			return false;
		}
	}
	return true;
}

/**
 * 取所有素数
 * @param {Array} arr 数组
 * @return {Array} 返回素数集合
 */
module.exports = function prime(arr) {
	var arr_new = [];
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		var n = arr[i];
		if (isPrinme(n)) {
			arr_new.push(n);
		}
	}
	return arr_new;
};
